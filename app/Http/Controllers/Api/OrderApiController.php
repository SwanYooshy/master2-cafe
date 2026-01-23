<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Http\Resources\OrderResource;

class OrderApiController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['table', 'products']);

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('id', 'like', '%' . $searchTerm . '%')
                ->orWhereHas('table', function ($tableQuery) use ($searchTerm) {
                    $tableQuery->where('name', 'like', '%' . $searchTerm . '%');
                });
            });
        }

        $orders = $query->latest()->get();

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
            'notes' => 'nullable|string',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'table_id' => $validated['table_id'],
            'notes' => $validated['notes'] ?? null,
            'price' => 0,
            'status' => 'pending',
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

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'sometimes|in:pending,preparing,ready,served,cancelled',
            'notes' => 'sometimes|nullable|string',
        ]);

        $order->update($validated);
        $order->load(['table', 'products']);

        return new OrderResource($order);
    }


    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(null, 204);
    }
}
