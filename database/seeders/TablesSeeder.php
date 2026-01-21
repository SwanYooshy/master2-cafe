<?php

namespace Database\Seeders;

use App\Models\Tables;
use Illuminate\Database\Seeder;

class TablesSeeder extends Seeder
{
    public function run(): void
    {
        $tables = [
            ['name' => 'Espresso'],
            ['name' => 'Cappuccino'],
            ['name' => 'Latte'],
            ['name' => 'Americano'],
            ['name' => 'Ristretto'],
            ['name' => 'Macchiato'],
            ['name' => 'Mocha'],
            ['name' => 'Flat White'],
            ['name' => 'Cold Brew'],
            ['name' => 'Affogato'],
            ['name' => 'Frappuccino'],
        ];

        foreach ($tables as $table) {
            Tables::create($table);
        }
    }
}
