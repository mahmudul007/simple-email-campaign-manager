<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignRecipient extends Model
{
    /** @use HasFactory<\Database\Factories\CampaignRecipientFactory> */
    use HasFactory;
    protected $fillable = ['contact_id'];
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

}
