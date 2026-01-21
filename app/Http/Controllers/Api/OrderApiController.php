<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Http\Resources\OrderResource;

class OrderApiController extends Controller
{
    public function index()
    {
        $orders = Order::with(['table', 'products'])->latest()->get();
        return OrderResource::collection($orders);
    }

    public function show(Order $order)
    {
        $order->load(['table', 'products']);
        return new OrderResource($order);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'table_id' => 'required|exists:tables,id',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'table_id' => $validated['table_id'],
            'price' => 0,
        ]);

        $total = 0;

        foreach ($validated['products'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $lineTotal = $product->price * $item['quantity'];
            $total += $lineTotal;

            $order->products()->attach($product->id, [
                'quantity' => $item['quantity'],
                'unit_price' => $product->price,
            ]);
        }

        $order->update(['price' => $total]);
        $order->load(['table', 'products']);

        return (new OrderResource($order))
            ->response()
            ->setStatusCode(201);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(null, 204);
    }
}
