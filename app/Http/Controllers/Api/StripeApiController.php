<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
class StripeApiController extends Controller
{
    public function getStripeKeys()
    {
        return response()->json([
            'stripe_key' => env('STRIPE_KEY'),
            'stripe_secret' => env('STRIPE_SECRET'),
        ]);
    }
}
