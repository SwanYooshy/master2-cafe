<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image' => $this->image ? url($this->image) : null,
            'price' => (float) $this->price,
            'stock' => (int) $this->stock,
            'category' => $this->category->name,
            'categoryId' => $this->category->slug,
            'enabled' => $this->enabled,
            'variants' => ProductVariantResource::collection($this->whenLoaded('variants')),
        ];
    }
}
