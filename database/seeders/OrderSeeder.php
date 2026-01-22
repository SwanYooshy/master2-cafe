<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Product;
use App\Models\Tables;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tables = Tables::all();
        $products = Product::where('is_active', true)->get();

        if ($tables->isEmpty() || $products->isEmpty()) {
            $this->command->warn('WARN: Tables ou Products manquants. Seeder Order ignoré.');
            return;
        }

        $ordersCount = 15;
        $statuses = ['pending', 'preparing', 'ready', 'served'];

        for ($i = 0; $i < $ordersCount; $i++) {
            $table = $tables->random();
            $order = Order::create([
                'table_id' => $table->id,
                'price' => 0,
                'status' => $statuses[array_rand($statuses)],
                'notes' => rand(0, 1) ? 'Note de commande exemple' : null,
            ]);

            $orderProducts = $products->random(rand(1, 4));
            $total = 0;

            foreach ($orderProducts as $product) {
                $quantity = rand(1, 3);
                $lineTotal = $product->price * $quantity;
                $total += $lineTotal;

                $order->products()->attach($product->id, [
                    'quantity' => $quantity,
                    'unit_price' => $product->price,
                ]);
            }

            $order->update(['price' => $total]);
        }

        $this->command->info("$ordersCount commandes créées avec succès.");
    }
}
