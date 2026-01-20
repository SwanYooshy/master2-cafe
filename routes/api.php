<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserApiController;

Route::prefix('v1')->group(function () {
    Route::apiResource('users', UserApiController::class);
});
