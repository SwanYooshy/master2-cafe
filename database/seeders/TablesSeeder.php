<?php

namespace Database\Seeders;

use App\Models\Tables;
use Illuminate\Database\Seeder;

class TablesSeeder extends Seeder
{
    public function run(): void
    {
        $tables = [
            ['name' => 'Espresso', 'capacity' => 2, 'status' => 'occuper', 'active_orders' => 1],
            ['name' => 'Cappuccino', 'capacity' => 4, 'status' => 'libre', 'active_orders' => 0],
            ['name' => 'Latte', 'capacity' => 2, 'status' => 'libre', 'active_orders' => 0],
            ['name' => 'Americano', 'capacity' => 3, 'status' => 'occuper', 'active_orders' => 2],
            ['name' => 'Ristretto', 'capacity' => 2, 'status' => 'libre', 'active_orders' => 0],
            ['name' => 'Macchiato', 'capacity' => 4, 'status' => 'occuper', 'active_orders' => 1],
            ['name' => 'Mocha', 'capacity' => 2, 'status' => 'libre', 'active_orders' => 0],
            ['name' => 'Flat White', 'capacity' => 4, 'status' => 'libre', 'active_orders' => 0],
            ['name' => 'Cold Brew', 'capacity' => 2, 'status' => 'libre', 'active_orders' => 0],
            ['name' => 'Affogato', 'capacity' => 4, 'status' => 'libre', 'active_orders' => 0],
            ['name' => 'Frappuccino', 'capacity' => 2, 'status' => 'libre', 'active_orders' => 0],
        ];

        foreach ($tables as $table) {
            Tables::create($table);
        }
    }
}
