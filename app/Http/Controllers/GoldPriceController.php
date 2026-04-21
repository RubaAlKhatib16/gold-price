<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class GoldPriceController extends Controller
{
    public function index()
    {
        // Fetch gold price (example: using a free API)
        $response = Http::withoutVerifying()->get('https://api.gold-api.com/price/XAU');
        if (!$response->successful()) {
            return response()->json(['error' => 'Unable to fetch gold price'], 500);
        }
        $data = $response->json();
        $usdPerOunce = $data['price'] ?? 1942.50; // fallback
        $usdPerGram = $usdPerOunce / 31.1035;

        // Fetch USD to JOD exchange rate (using free API, or use fixed rate)
        $exchangeResponse = Http::withoutVerifying()->get('https://api.exchangerate-api.com/v4/latest/USD');
        $jodRate = $exchangeResponse->successful() ? ($exchangeResponse->json()['rates']['JOD'] ?? 0.709) : 0.709;

        $jodPerGram = $usdPerGram * $jodRate;

        return response()->json([
            'usd' => round($usdPerGram, 2),
            'jod' => round($jodPerGram, 2),
            'usd_change' => '+0.45', // optional, can be calculated
            'jod_change' => '+0.45',
        ]);
    }
}