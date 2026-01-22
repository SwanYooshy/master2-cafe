<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'slug' => $this->faker->unique()->slug(2),
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->sentence(),
        ];
    }

    public function cappuccino(): static
    {
        return $this->state(fn (array $attributes) => [
            'slug' => 'cappuccino',
            'name' => 'Cappuccino',
            'description' => 'Café avec mousse de lait',
        ]);
    }

    public function latte(): static
    {
        return $this->state(fn (array $attributes) => [
            'slug' => 'latte',
            'name' => 'Latte',
            'description' => 'Café au lait onctueux',
        ]);
    }

    public function macchiato(): static
    {
        return $this->state(fn (array $attributes) => [
            'slug' => 'macchiato',
            'name' => 'Macchiato',
            'description' => 'Espresso avec une touche de lait',
        ]);
    }

    public function americano(): static
    {
        return $this->state(fn (array $attributes) => [
            'slug' => 'americano',
            'name' => 'Americano',
            'description' => 'Espresso allongé',
        ]);
    }

    public function food(): static
    {
        return $this->state(fn (array $attributes) => [
            'slug' => 'food',
            'name' => 'Nourriture',
            'description' => 'Snacks et pâtisseries',
        ]);
    }
}
