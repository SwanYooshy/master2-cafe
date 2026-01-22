<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'price' => (float) $this->price,
            'table' => [
                'id' => (string) $this->table->id,
                'name' => $this->table->name,
            ],
            'products' => OrderProductResource::collection($this->whenLoaded('products')),
            'createdAt' => $this->created_at->toDateTimeString(),
        ];
    }
}
