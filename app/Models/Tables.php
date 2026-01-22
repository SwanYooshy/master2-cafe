<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tables extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'capacity',
        'status',
        'active_orders',
    ];

    protected $casts = [
        'capacity' => 'integer',
        'active_orders' => 'integer',
    ];
}
