<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Asset;

class AssetController extends Controller
{
    // جلب جميع الأصول مع حساب القيمة الحالية والربح
    public function index(Request $request)
    {
        $assets = $request->user()->assets;

        // جلب سعر الذهب الحي
        $response = Http::withoutVerifying()->get('https://api.gold-api.com/price/XAU');
        if (!$response->successful()) {
            return response()->json(['message' => 'Failed to fetch gold price'], 500);
        }
        $data = $response->json();
        if (!isset($data['price'])) {
            return response()->json(['message' => 'Invalid gold API response'], 500);
        }
        $currentGram = $data['price'] / 31.1035;

        foreach ($assets as $asset) {
            
            $karatNum = (int) filter_var($asset->karat, FILTER_SANITIZE_NUMBER_INT);
            if ($karatNum == 24) {
                $pricePerGram = $currentGram;
            } elseif ($karatNum == 22) {
                $pricePerGram = $currentGram * 0.916;
            } elseif ($karatNum == 21) {
                $pricePerGram = $currentGram * 0.875;
            } elseif ($karatNum == 18) {
                $pricePerGram = $currentGram * 0.75;
            } else {
                $pricePerGram = $currentGram;
            }

            $currentValue = $asset->weight * $pricePerGram;
            $purchaseValue = $asset->purchase_price; 
            $asset->current_value = round($currentValue, 2);
            $asset->profit_loss = round($currentValue - $purchaseValue, 2);
        }

        return response()->json($assets);
    }

    
   public function store(Request $request)
{
    $request->validate([
        'asset_type' => 'required|string',  
        'karat' => 'required|string',
        'weight' => 'required|numeric',
        'purchase_price' => 'required|numeric',
        'purchase_date' => 'required|date',
        'image' => 'nullable|image|max:2048',
    ]);

    $asset = new Asset();
    $asset->user_id = auth()->id();
    $asset->asset_type = $request->asset_type;  
    $asset->category = $request->asset_type;    
    $asset->type = 'gold';                      
    $asset->karat = $request->karat;
    $asset->weight = $request->weight;
    $asset->purchase_price = $request->purchase_price;
    $asset->purchase_date = $request->purchase_date;

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('assets', 'public');
        $asset->image_path = $path;
    }

    $asset->save();

    return response()->json(['message' => 'Asset created', 'asset' => $asset], 201);
}

    // عرض أصل واحد للتعديل
    public function show($id)
    {
        $asset = Asset::where('user_id', auth()->id())->findOrFail($id);
        return response()->json($asset);
    }

    // تحديث أصل
    public function update(Request $request, $id)
    {
        $asset = Asset::where('user_id', auth()->id())->findOrFail($id);

        $request->validate([
    'asset_type' => 'required|string',   // ✅ correct
    'karat' => 'required|string',
    'weight' => 'required|numeric',
    'purchase_price' => 'required|numeric',
    'purchase_date' => 'required|date',
    'image' => 'nullable|image|max:2048',
]);

        $asset->category = $request->asset_type;
        $asset->karat = $request->karat;
        $asset->weight = $request->weight;
        $asset->purchase_price = $request->purchase_price;
        $asset->purchase_date = $request->purchase_date;

        if ($request->hasFile('image')) {
            if ($asset->image_path) {
                Storage::disk('public')->delete($asset->image_path);
            }
            $path = $request->file('image')->store('assets', 'public');
            $asset->image_path = $path;
        }

        $asset->save();

        return response()->json(['message' => 'Asset updated', 'asset' => $asset]);
    }

    // حذف أصل
    public function destroy($id)
    {
        $asset = Asset::findOrFail($id);
        if ($asset->image_path) {
            Storage::disk('public')->delete($asset->image_path);
        }
        $asset->delete();
        return response()->json(['message' => 'Asset deleted successfully']);
    }

    // إحصائيات الـ Dashboard
    public function dashboard(Request $request)
    {
        $assets = $request->user()->assets;

        $response = Http::withoutVerifying()->get('https://api.gold-api.com/price/XAU');
        $data = $response->json();
        $currentGram = $data['price'] / 31.1035;

        $totalCurrent = 0;
        $totalPurchase = 0;
        $totalWeight = 0;

        foreach ($assets as $asset) {
            $karatNum = (int) filter_var($asset->karat, FILTER_SANITIZE_NUMBER_INT);
            if ($karatNum == 24) $pricePerGram = $currentGram;
            elseif ($karatNum == 22) $pricePerGram = $currentGram * 0.916;
            elseif ($karatNum == 21) $pricePerGram = $currentGram * 0.875;
            elseif ($karatNum == 18) $pricePerGram = $currentGram * 0.75;
            else $pricePerGram = $currentGram;

            $currentValue = $asset->weight * $pricePerGram;
            $totalCurrent += $currentValue;
            $totalPurchase += $asset->purchase_price;
            $totalWeight += $asset->weight;
        }

        return response()->json([
            'total_assets' => round($totalWeight, 2),
            'total_current_value' => round($totalCurrent, 2),
            'total_purchase_value' => round($totalPurchase, 2),
            'total_profit_loss' => round($totalCurrent - $totalPurchase, 2),
            'profit_percentage' => $totalPurchase > 0 ? round((($totalCurrent - $totalPurchase) / $totalPurchase) * 100, 2) : 0,
            'total_items' => $assets->count(),
        ]);
    }
}