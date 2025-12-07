<?php

namespace App\Services;

use App\Jobs\SendCampaignEmail;
use App\Models\Campaign;

class CampaignService
{
    public function sendCampaignEmail($data)
    {
        // test 

        $campaign = Campaign::create([
            'subject' => $data['subject'],
            'body' => $data['body'],
        ]);

        foreach ($data['recipients'] as $contactId) {
            $recipient = $campaign->recipients()->create([
                'contact_id' => $contactId,
            ]);
            SendCampaignEmail::dispatch($recipient);
        }
    }
}
