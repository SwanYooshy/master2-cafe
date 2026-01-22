<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tables;
use App\Http\Resources\TablesResource;
use Illuminate\Http\Request;

class TablesApiController extends Controller
{
    public function index()
    {
        $tables = Tables::all();
        return TablesResource::collection($tables);
    }

    public function show(Tables $table)
    {
        return new TablesResource($table);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'status' => 'sometimes|in:libre,occuper',
            'active_orders' => 'sometimes|integer|min:0',
        ]);

        $table = Tables::create($validated);

        return (new TablesResource($table))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, Tables $table)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'status' => 'sometimes|in:libre,occuper',
            'active_orders' => 'sometimes|integer|min:0',
        ]);

        $table->update($validated);

        return new TablesResource($table);
    }

    public function destroy(Tables $table)
    {
        $table->delete();

        return response()->json([
            'message' => 'Table deleted successfully'
        ], 200);
    }

    public function updateStatus(Request $request, Tables $table)
    {
        $validated = $request->validate([
            'status' => 'required|in:libre,occuper',
        ]);

        if ($validated['status'] === 'libre') {
            $table->update([
                'status' => 'libre',
                'active_orders' => 0,
            ]);
        } else {
            $table->update([
                'status' => $validated['status'],
            ]);
        }

        return new TablesResource($table);
    }
}
