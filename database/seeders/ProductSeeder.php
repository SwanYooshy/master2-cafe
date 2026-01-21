<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $cappuccino = Category::firstOrCreate(['slug' => 'cappuccino'], ['name' => 'Cappuccino', 'description' => 'Café avec mousse de lait']);
        $latte = Category::firstOrCreate(['slug' => 'latte'], ['name' => 'Latte', 'description' => 'Café au lait onctueux']);
        $macchiato = Category::firstOrCreate(['slug' => 'macchiato'], ['name' => 'Macchiato', 'description' => 'Espresso avec une touche de lait']);
        $americano = Category::firstOrCreate(['slug' => 'americano'], ['name' => 'Americano', 'description' => 'Espresso allongé']);
        $food = Category::firstOrCreate(['slug' => 'food'], ['name' => 'Nourriture', 'description' => 'Snacks et pâtisseries']);
        Product::factory()->espressoMacchiato()->create(['category_id' => $macchiato->id]);
        Product::factory()->cappuccino()->create(['category_id' => $cappuccino->id]);
        Product::factory()->latte()->create(['category_id' => $latte->id]);
        Product::factory()->caramelLatte()->create(['category_id' => $latte->id]);
        Product::factory()->vanillaLatte()->create(['category_id' => $latte->id]);
        Product::factory()->flatWhite()->create(['category_id' => $latte->id]);
        Product::factory()->americano()->create(['category_id' => $americano->id]);
        Product::factory()->icedAmericano()->create(['category_id' => $americano->id]);
        Product::factory()->icedLatte()->create(['category_id' => $latte->id]);
        Product::factory()->caramelMacchiato()->create(['category_id' => $macchiato->id]);
        Product::factory()->icedCaramelMacchiato()->create(['category_id' => $macchiato->id]);
        Product::factory()->cafeFiltre()->create(['category_id' => $americano->id]);
        Product::factory()->pistachioHotChocolate()->create(['category_id' => $latte->id]);
        Product::factory()->pistachioIcedChocolate()->create(['category_id' => $latte->id]);
        Product::factory()->chocolatViennoisClassique()->create(['category_id' => $latte->id]);
        Product::factory()->chocolatViennoisGlace()->create(['category_id' => $latte->id]);
        Product::factory()->matchaGreenTeaLatte()->create(['category_id' => $latte->id]);
        Product::factory()->icedMatchaGreenTeaLatte()->create(['category_id' => $latte->id]);
        Product::factory()->chaiTeaLatte()->create(['category_id' => $latte->id]);
        Product::factory()->icedChaiTeaLatte()->create(['category_id' => $latte->id]);
        Product::factory()->refreshaCoolLime()->create(['category_id' => $latte->id]);
        Product::factory()->refreshaDragonMango()->create(['category_id' => $latte->id]);
        Product::factory()->refreshaVeryBerry()->create(['category_id' => $latte->id]);
        Product::factory()->peachIcedTea()->create(['category_id' => $latte->id]);
        Product::factory()->frappuccinoCafeCaramel()->create(['category_id' => $latte->id]);
        Product::factory()->frappuccinoCafeCaramel()->create(['category_id' => $latte->id]);
        Product::factory()->frappuccinoCafe()->create(['category_id' => $latte->id]);
        Product::factory()->frappuccinoMocha()->create(['category_id' => $latte->id]);
        Product::factory()->frappuccinoCookiesAndCream()->create(['category_id' => $latte->id]);
        Product::factory()->frappuccinoCremeCaramel()->create(['category_id' => $latte->id]);
        Product::factory()->frappuccinoVanille()->create(['category_id' => $latte->id]);
        Product::factory()->frappuccinoChocolat()->create(['category_id' => $latte->id]);
        Product::factory()->pistachioPyramid()->create(['category_id' => $food->id]);
        Product::factory()->hazelnutPyramid()->create(['category_id' => $food->id]);
        Product::factory()->croissantBeurre()->create(['category_id' => $food->id]);
        Product::factory()->painAuChocolat()->create(['category_id' => $food->id]);
        Product::factory()->birthdayCakepop()->create(['category_id' => $food->id]);
        Product::factory()->cookieAndCreamCakepop()->create(['category_id' => $food->id]);
        Product::factory()->cookiePistache()->create(['category_id' => $food->id]);
        Product::factory()->cookiePepites()->create(['category_id' => $food->id]);
        Product::factory()->cookieToutChocolat()->create(['category_id' => $food->id]);
        Product::factory()->blueberryMuffin()->create(['category_id' => $food->id]);
        Product::factory()->vanillaChocoMuffin()->create(['category_id' => $food->id]);
        Product::factory()->doubleChocoMuffin()->create(['category_id' => $food->id]);
        Product::factory()->chocolateLoverCake()->create(['category_id' => $food->id]);
        Product::factory()->cookieAndCreamCake()->create(['category_id' => $food->id]);
        Product::factory()->pistachioLatteLoafCake()->create(['category_id' => $food->id]);
        Product::factory()->cakeSpeculoos()->create(['category_id' => $food->id]);
        Product::factory()->bananaBread()->create(['category_id' => $food->id]);
        Product::factory()->carrotCake()->create(['category_id' => $food->id]);
        Product::factory()->cakeCitron()->create(['category_id' => $food->id]);
        Product::factory()->cinnamonRoll()->create(['category_id' => $food->id]);
        Product::factory()->pistachioFilledDonut()->create(['category_id' => $food->id]);
        Product::factory()->sugarDonut()->create(['category_id' => $food->id]);
        Product::factory()->donutBlanc()->create(['category_id' => $food->id]);
        Product::factory()->sugarDonut()->create(['category_id' => $food->id]);
        Product::factory()->donutBlanc()->create(['category_id' => $food->id]);
        Product::factory()->eggBacon()->create(['category_id' => $food->id]);
        Product::factory()->eggCheese()->create(['category_id' => $food->id]);
        Product::factory()->eggtoastEpinard()->create(['category_id' => $food->id]);
        Product::factory()->eggtoastBacon()->create(['category_id' => $food->id]);
        Product::factory()->eggBaconMuffin()->create(['category_id' => $food->id]);
        Product::factory()->eggAvocadoMuffin()->create(['category_id' => $food->id]);
        Product::factory()->miniIberique()->create(['category_id' => $food->id]);
        Product::factory()->miniDinde()->create(['category_id' => $food->id]);
        Product::factory()->miniThon()->create(['category_id' => $food->id]);
        Product::factory()->turkeyToastie()->create(['category_id' => $food->id]);
        Product::factory()->chickenCaesarWrap()->create(['category_id' => $food->id]);
        Product::factory()->turkeyToastie()->create(['category_id' => $food->id]);
        Product::factory()->chickenCaesarWrap()->create(['category_id' => $food->id]);
        Product::factory()->sandwichPouletCheddar()->create(['category_id' => $food->id]);
        Product::factory()->sandwichTomatesMozzarella()->create(['category_id' => $food->id]);
        Product::factory()->toastieJambonFromage()->create(['category_id' => $food->id]);
        Product::factory()->toastieCinqFromages()->create(['category_id' => $food->id]);
        Product::factory()->ranchVegetarianWrap()->create(['category_id' => $food->id]);
    }
}
