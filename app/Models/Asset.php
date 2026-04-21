<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{

protected $fillable = [
    'user_id',
     'asset_type',
      'type', 
      'karat',
       'category',
    'weight', 
    'purchase_price',
     'purchase_date',
      'image_path'
];
}
