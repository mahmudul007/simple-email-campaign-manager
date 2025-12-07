<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    /** @use HasFactory<\Database\Factories\CampaignFactory> */
    use HasFactory;
    protected $fillable = [
        'subject',
        'body',
    ];
    public function recipients()
    {
        return $this->hasMany(CampaignRecipient::class);
    }

    // rules for campaign
    public static function rules()
    {
        return [
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'recipients' => 'required|array',
            'recipients.*' => 'exists:contacts,id',
        ];
    }
}
