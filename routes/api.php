<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserApiController;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\CategoryApiController;
use App\Http\Controllers\Api\TablesApiController;
use App\Http\Controllers\Api\OrderApiController;
use App\Http\Controllers\Api\StripeApiController;

Route::prefix('v1')->group(function () {
    Route::apiResource('users', UserApiController::class);
    Route::apiResource('products', ProductApiController::class);
    Route::apiResource('categories', CategoryApiController::class)->only(['index', 'show']);
    Route::apiResource('tables', TablesApiController::class);
    Route::apiResource('orders', OrderApiController::class);
    Route::get('stripe-keys', [StripeApiController::class, 'getStripeKeys']);
});
