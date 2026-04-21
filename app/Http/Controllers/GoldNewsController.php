<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class GoldNewsController extends Controller
{
    public function index()
    {
        $apiKey = env('GNEWS_API_KEY');

        if (!$apiKey) {
            return response()->json(['error' => 'API key missing'], 500);
        }

        // Better search query focusing on financial/precious metals context
        $response = Http::withoutVerifying()->get('https://gnews.io/api/v4/search', [
            'q' => '"gold price" OR "gold market" OR "precious metals" OR "gold mining" OR "gold reserve" OR "bullion" OR "XAU"',
            'lang' => 'en',
            'country' => 'us',
            'max' => 20,
            'apikey' => $apiKey,
        ]);

        if (!$response->successful()) {
            return response()->json(['articles' => []], 500);
        }

        $articles = $response->json()['articles'] ?? [];

        // Stricter filtering: exclude clearly irrelevant topics
        $excludeKeywords = ['wrestling', 'wwe', 'sports', 'olympic', 'gold medal', 'gold star father', 'tv series', 'kdrama', 'disney', 'celebrity', 'comedy', 'venmo', 'rapinoe', 'bird', 'sylvia gold', 'talent agent'];

        $filtered = array_filter($articles, function ($article) use ($excludeKeywords) {
            $title = strtolower($article['title'] ?? '');
            $desc = strtolower($article['description'] ?? '');
            $content = strtolower($article['content'] ?? '');

            // Must contain at least one positive financial keyword
            $positiveKeywords = ['gold price', 'gold market', 'precious metal', 'bullion', 'gold mining', 'gold reserve', 'xau', 'gold rises', 'gold falls', 'gold hits', 'gold rally', 'gold demand', 'gold supply', 'central bank gold', 'gold etf', 'gold investment'];
            $hasPositive = false;
            foreach ($positiveKeywords as $keyword) {
                if (str_contains($title, $keyword) || str_contains($desc, $keyword) || str_contains($content, $keyword)) {
                    $hasPositive = true;
                    break;
                }
            }
            if (!$hasPositive) return false;

            // Exclude any article with irrelevant keywords
            foreach ($excludeKeywords as $exclude) {
                if (str_contains($title, $exclude) || str_contains($desc, $exclude)) {
                    return false;
                }
            }
            return true;
        });

        return response()->json(['articles' => array_values($filtered)]);
    }
}