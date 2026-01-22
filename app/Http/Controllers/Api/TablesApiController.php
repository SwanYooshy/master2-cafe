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
}
