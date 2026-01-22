<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['slug' => 'cappuccino', 'name' => 'Cappuccino', 'description' => 'Café avec mousse de lait'],
            ['slug' => 'latte', 'name' => 'Latte', 'description' => 'Café au lait onctueux'],
            ['slug' => 'macchiato', 'name' => 'Macchiato', 'description' => 'Espresso avec une touche de lait'],
            ['slug' => 'americano', 'name' => 'Americano', 'description' => 'Espresso allongé'],
            ['slug' => 'food', 'name' => 'Nourriture', 'description' => 'Snacks et pâtisseries'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
