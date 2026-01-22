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
            'total' => (float) $this->price,
            'tableName' => $this->table->name,
            'tableId' => (string) $this->table->id,
            'items' => OrderProductResource::collection($this->whenLoaded('products')),
            'createdAt' => $this->created_at->toDateTimeString(),
            'updatedAt' => $this->updated_at->toDateTimeString(),
            'status' => $this->status,
            'notes' => $this->notes,
        ];
    }
}
