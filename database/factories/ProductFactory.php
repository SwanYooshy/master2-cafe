<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{

    public function definition(): array
    {
        return [
            'name' => 'Café',
            'description' => 'Une délicieuse boisson.',
            'image' => null,
            'price' => 4.50,
            'category_id' => Category::factory(),
            'is_active' => true,
        ];
    }

    public function espressoMacchiato(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Espresso Macchiato',
            'description' => 'Espresso classique avec une touche de mousse de lait onctueuse.',
            'price' => 2.95,
        ]);
    }

    public function cappuccino(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Cappuccino',
            'description' => 'Espresso onctueux avec une généreuse couche de mousse de lait crémeuse.',
            'price' => 4.95,
        ]);
    }

    public function latte(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Caffè Latte',
            'description' => 'Espresso riche avec du lait vapeur et une fine couche de mousse.',
            'price' => 4.75,
        ]);
    }

    public function caramelLatte(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Caramel Latte',
            'description' => 'Caffè Latte avec une délicieuse sauce caramel et chantilly.',
            'price' => 5.45,
        ]);
    }

    public function vanillaLatte(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Vanilla Latte',
            'description' => 'Caffè Latte parfumé à la vanille naturelle.',
            'price' => 5.45,
        ]);
    }

    public function flatWhite(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Flat White',
            'description' => 'Deux shots d\'espresso ristretto avec du lait vapeur micro-mousse.',
            'price' => 4.95,
        ]);
    }

    public function americano(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Americano',
            'description' => 'Espresso allongé avec de l\'eau chaude pour un café doux et riche.',
            'price' => 3.75,
        ]);
    }

    public function icedAmericano(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Iced Americano',
            'description' => 'Espresso allongé servi sur glace, rafraîchissant et intense.',
            'price' => 4.25,
        ]);
    }

    public function icedLatte(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Iced Caffè Latte',
            'description' => 'Espresso avec du lait froid servi sur glace.',
            'price' => 5.25,
        ]);
    }

    public function caramelMacchiato(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Caramel Macchiato',
            'description' => 'Lait vapeur vanillé marqué d\'espresso et couronné de sauce caramel.',
            'price' => 5.75,
        ]);
    }

    public function icedCaramelMacchiato(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Iced Caramel Macchiato',
            'description' => 'Lait vanillé sur glace, marqué d\'espresso et de sauce caramel.',
            'price' => 6.25,
        ]);
    }

    public function cafeFiltre(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Café Filtre',
            'description' => 'Café filtre fraîchement préparé, doux et aromatique.',
            'price' => 2.75,
        ]);
    }

    public function pistachioHotChocolate(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Pistachio Hot Chocolate',
            'description' => 'Chocolat chaud crémeux avec une délicieuse saveur pistache.',
            'price' => 5.45,
        ]);
    }

    public function pistachioIcedChocolate(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Pistachio Iced Chocolate',
            'description' => 'Chocolat glacé rafraîchissant avec une touche de pistache.',
            'price' => 5.95,
        ]);
    }

    public function chocolatViennoisClassique(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Chocolat Viennois Classique',
            'description' => 'Chocolat chaud onctueux couronné de chantilly.',
            'price' => 5.25,
        ]);
    }

    public function chocolatViennoisGlace(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Chocolat Viennois Glacé',
            'description' => 'Version glacée de notre chocolat viennois avec chantilly.',
            'price' => 5.75,
        ]);
    }

    public function matchaGreenTeaLatte(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Matcha Green Tea Latte',
            'description' => 'Thé matcha de qualité premium mélangé avec du lait vapeur.',
            'price' => 5.75,
        ]);
    }

    public function icedMatchaGreenTeaLatte(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Iced Matcha Green Tea Latte',
            'description' => 'Thé matcha premium avec du lait froid servi sur glace.',
            'price' => 6.25,
        ]);
    }

    public function chaiTeaLatte(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Chai Tea Latte',
            'description' => 'Infusion épicée de thé noir, cannelle, clou de girofle et gingembre avec du lait vapeur.',
            'price' => 5.25,
        ]);
    }

    public function icedChaiTeaLatte(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Iced Chai Tea Latte',
            'description' => 'Notre Chai Tea Latte servi sur glace, épicé et rafraîchissant.',
            'price' => 5.75,
        ]);
    }

    public function refreshaCoolLime(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Refresha® Cool Lime',
            'description' => 'Boisson rafraîchissante au citron vert avec des morceaux de citron.',
            'price' => 4.95,
        ]);
    }

    public function refreshaDragonMango(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Refresha® Dragon Mango',
            'description' => 'Boisson exotique au fruit du dragon et à la mangue.',
            'price' => 4.95,
        ]);
    }

    public function refreshaVeryBerry(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Refresha® Very Berry',
            'description' => 'Mélange de baies fraîches pour une explosion de saveurs.',
            'price' => 4.95,
        ]);
    }

    public function peachIcedTea(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Peach Iced Tea',
            'description' => 'Thé glacé à la pêche, doux et désaltérant.',
            'price' => 4.45,
        ]);
    }

    public function frappuccinoCafeCaramel(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Frappuccino® Café Caramel',
            'description' => 'Café frappé avec sauce caramel, lait et glace, couronné de chantilly.',
            'price' => 6.45,
        ]);
    }

    public function frappuccinoCafe(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Frappuccino® Café',
            'description' => 'Café frappé classique avec lait et glace.',
            'price' => 5.95,
        ]);
    }

    public function frappuccinoMocha(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Frappuccino® Mocha',
            'description' => 'Café frappé au chocolat avec lait, glace et chantilly.',
            'price' => 6.45,
        ]);
    }

    public function frappuccinoCookiesAndCream(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Frappuccino® Cookies & Cream',
            'description' => 'Boisson frappée crémeuse avec des morceaux de cookies Oreo.',
            'price' => 6.75,
        ]);
    }

    public function frappuccinoCremeCaramel(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Frappuccino® Crème Caramel',
            'description' => 'Boisson frappée crémeuse au caramel sans café.',
            'price' => 6.25,
        ]);
    }

    public function frappuccinoVanille(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Frappuccino® Vanille',
            'description' => 'Boisson frappée crémeuse à la vanille.',
            'price' => 6.25,
        ]);
    }

    public function frappuccinoChocolat(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Frappuccino® Chocolat',
            'description' => 'Boisson frappée crémeuse au chocolat.',
            'price' => 6.25,
        ]);
    }

    public function pistachioPyramid(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Pistachio Pyramid',
            'description' => 'Viennoiserie feuilletée en forme de pyramide fourrée à la pistache.',
            'price' => 3.95,
        ]);
    }

    public function hazelnutPyramid(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Hazelnut Pyramid',
            'description' => 'Viennoiserie feuilletée en forme de pyramide fourrée à la noisette.',
            'price' => 3.95,
        ]);
    }

    public function croissantBeurre(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Croissant au Beurre',
            'description' => 'Croissant pur beurre cuit sur place, croustillant et doré.',
            'price' => 2.45,
        ]);
    }

    public function painAuChocolat(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Pain au Chocolat',
            'description' => 'Viennoiserie feuilletée avec deux barres de chocolat, cuite sur place.',
            'price' => 2.75,
        ]);
    }

    public function birthdayCakepop(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Birthday Cakepop',
            'description' => 'Cake pop festif avec glaçage coloré et vermicelles.',
            'price' => 2.95,
        ]);
    }

    public function cookieAndCreamCakepop(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Cookie and Cream Cakepop',
            'description' => 'Cake pop au goût cookies & cream avec enrobage chocolat.',
            'price' => 2.95,
        ]);
    }

    public function cookiePistache(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Cookie Pistache',
            'description' => 'Cookie moelleux aux éclats de pistache.',
            'price' => 3.25,
        ]);
    }

    public function cookiePepites(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Cookie Pépites',
            'description' => 'Cookie aux pépites de chocolat cuit sur place, encore chaud.',
            'price' => 2.95,
        ]);
    }

    public function cookieToutChocolat(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Cookie Tout Chocolat',
            'description' => 'Cookie entièrement au chocolat avec pépites, cuit sur place.',
            'price' => 2.95,
        ]);
    }

    public function blueberryMuffin(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Blueberry Muffin',
            'description' => 'Muffin moelleux aux myrtilles fraîches.',
            'price' => 3.45,
        ]);
    }

    public function vanillaChocoMuffin(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Vanilla Choco Muffin',
            'description' => 'Muffin à la vanille avec cœur fondant au chocolat.',
            'price' => 3.45,
        ]);
    }

    public function doubleChocoMuffin(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Double Choco Muffin',
            'description' => 'Muffin double chocolat pour les amateurs de cacao.',
            'price' => 3.45,
        ]);
    }

    public function chocolateLoverCake(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Chocolate Lover Cake',
            'description' => 'Part de gâteau au chocolat intense avec ganache.',
            'price' => 4.95,
        ]);
    }

    public function cookieAndCreamCake(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Cookie and Cream Cake',
            'description' => 'Part de gâteau façon cookies & cream avec crème onctueuse.',
            'price' => 4.95,
        ]);
    }

    public function pistachioLatteLoafCake(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Pistachio Latte Loaf Cake',
            'description' => 'Cake à la pistache avec glaçage au café.',
            'price' => 3.75,
        ]);
    }

    public function cakeSpeculoos(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Cake au Spéculoos',
            'description' => 'Cake moelleux aux épices et morceaux de spéculoos.',
            'price' => 3.45,
        ]);
    }

    public function bananaBread(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Banana Bread',
            'description' => 'Pain à la banane moelleux et réconfortant.',
            'price' => 3.25,
        ]);
    }

    public function carrotCake(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Carrot Cake',
            'description' => 'Gâteau à la carotte avec glaçage au fromage frais.',
            'price' => 3.75,
        ]);
    }

    public function cakeCitron(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Cake Citron',
            'description' => 'Cake au citron avec glaçage acidulé.',
            'price' => 3.45,
        ]);
    }

    public function cinnamonRoll(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Cinnamon Roll',
            'description' => 'Brioche roulée à la cannelle avec glaçage sucré, cuite sur place.',
            'price' => 3.95,
        ]);
    }

    public function pistachioFilledDonut(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Pistachio Filled Donut',
            'description' => 'Donut fourré à la crème pistache avec glaçage.',
            'price' => 3.45,
        ]);
    }

    public function sugarDonut(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Sugar Donut',
            'description' => 'Donut classique enrobé de sucre.',
            'price' => 2.45,
        ]);
    }

    public function donutBlanc(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Donut Blanc',
            'description' => 'Donut avec glaçage blanc et vermicelles colorés.',
            'price' => 2.75,
        ]);
    }

    public function eggBacon(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Egg Bacon',
            'description' => 'Œuf et bacon croustillant sur pain brioché.',
            'price' => 5.95,
        ]);
    }

    public function eggCheese(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Egg Cheese',
            'description' => 'Œuf et fromage fondu sur pain brioché.',
            'price' => 5.45,
        ]);
    }

    public function eggtoastEpinard(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Eggtoast Épinard',
            'description' => 'Toast avec œuf et épinards frais. 155g.',
            'price' => 6.25,
        ]);
    }

    public function eggtoastBacon(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Eggtoast Bacon',
            'description' => 'Toast avec œuf et bacon. 155g.',
            'price' => 6.25,
        ]);
    }

    public function eggBaconMuffin(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Egg & Bacon Muffin',
            'description' => 'Muffin anglais avec œuf et bacon. 130g.',
            'price' => 4.95,
        ]);
    }

    public function eggAvocadoMuffin(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Egg and Avocado Muffin',
            'description' => 'Muffin anglais avec œuf et avocat frais.',
            'price' => 5.45,
        ]);
    }

    public function miniIberique(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Mini Ibérique',
            'description' => 'Mini sandwich au jambon ibérique.',
            'price' => 4.25,
        ]);
    }

    public function miniDinde(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Mini Dinde',
            'description' => 'Mini sandwich à la dinde.',
            'price' => 4.25,
        ]);
    }

    public function miniThon(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Mini Thon',
            'description' => 'Mini sandwich au thon.',
            'price' => 4.25,
        ]);
    }

    public function turkeyToastie(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Turkey Toastie',
            'description' => 'Sandwich chaud à la dinde.',
            'price' => 7.45,
        ]);
    }

    public function chickenCaesarWrap(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Chicken Caesar Wrap',
            'description' => 'Wrap au poulet façon César avec sauce crémeuse. 195g.',
            'price' => 7.95,
        ]);
    }

    public function sandwichPouletCheddar(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Sandwich Poulet & Cheddar',
            'description' => 'Sandwich au poulet avec cheddar fondu.',
            'price' => 7.45,
        ]);
    }

    public function sandwichTomatesMozzarella(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Sandwich Tomates & Mozzarella',
            'description' => 'Sandwich végétarien avec tomates fraîches et mozzarella.',
            'price' => 6.95,
        ]);
    }

    public function toastieJambonFromage(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Toastie Jambon Fromage',
            'description' => 'Sandwich grillé au jambon et fromage fondu.',
            'price' => 6.95,
        ]);
    }

    public function toastieCinqFromages(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Toastie 5 Fromages',
            'description' => 'Sandwich grillé avec un mélange de cinq fromages.',
            'price' => 7.25,
        ]);
    }

    public function ranchVegetarianWrap(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Ranch Vegetarian Wrap',
            'description' => 'Wrap végétarien avec sauce ranch et légumes frais.',
            'price' => 7.45,
        ]);
    }
}
