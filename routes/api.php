<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserApiController;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\CategoryApiController;

Route::prefix('v1')->group(function () {
    Route::apiResource('users', UserApiController::class);
    Route::apiResource('products', ProductApiController::class);
    Route::apiResource('categories', CategoryApiController::class)->only(['index', 'show']);
});
