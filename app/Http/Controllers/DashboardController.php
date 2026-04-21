<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\Asset;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $userId = $user->id;

        $assets = Asset::where('user_id', $userId)->get();

        
        $totalWeight = $assets->sum('weight');
        $totalPurchase = $assets->sum('purchase_price');

        
        try {
            $response = Http::get("https://api.gold-api.com/price/XAU");
            $data = $response->json();
            $spotPrice = $data['price'] ?? 60;
        } catch (\Exception $e) {
            $spotPrice = 60; 
        }

        
        $totalValue = $assets->sum(function ($asset) use ($spotPrice) {
            return $asset->weight * $spotPrice;
        });

        
        $totalProfit = $totalValue - $totalPurchase;

       
        $assets = $assets->map(function ($asset) use ($spotPrice) {
            $asset->current_value = $asset->weight * $spotPrice;
            $asset->profit_loss = $asset->current_value - $asset->purchase_price;
            return $asset;
        });

        return response()->json([
            'total_assets' => $totalWeight,
            'total_value' => $totalValue,
            'total_profit' => $totalProfit,
            'assets' => $assets,
            'spot_price' => $spotPrice,
            'total_items' => $assets->count(),
            'profit_percentage' => $totalPurchase > 0 ? ($totalProfit / $totalPurchase) * 100 : 0,
        ]);
    }
}
