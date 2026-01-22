<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return redirect('/dashboard');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('orders', function () {
    return Inertia::render('Orders');
})->name('orders');

Route::get('products', function () {
    return Inertia::render('Products');
})->name('products');

Route::get('tables', function () {
    return Inertia::render('Tables');
})->name('tables');

Route::get("/login", function () {
    return Inertia::render("Auth/Login");
});

require __DIR__.'/settings.php';
