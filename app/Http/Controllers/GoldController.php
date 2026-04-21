<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class GoldController extends Controller
{
    public function getPrice()
    {
        return Cache::remember('gold_price', 300, function () {

            $response = Http::withoutVerifying()->get('https://api.gold-api.com/price/XAU');
            $data = $response->json();

            $ounce = $data['price'];
            $gram = $ounce / 31.1035;

            $usd_to_jod = 0.71;

            return [
                'status' => 'success',
                'data' => [
                    'USD' => [
                        'ounce' => round($ounce, 2),
                        'gram' => round($gram, 2),
                        'karat' => [
                            '24k' => round($gram, 2),
                            '21k' => round($gram * 0.875, 2),
                            '18k' => round($gram * 0.75, 2),
                        ],
                    ],

                    'JOD' => [
                        'ounce' => round($ounce * $usd_to_jod, 2),
                        'gram' => round($gram * $usd_to_jod, 2),
                        'karat' => [
                            '24k' => round($gram * $usd_to_jod, 2),
                            '21k' => round($gram * 0.875 * $usd_to_jod, 2),
                            '18k' => round($gram * 0.75 * $usd_to_jod, 2),
                        ],
                    ],

                    'last_update' => $data['updatedAtReadable'] ?? null
                ]
            ];
        });
    }
}
