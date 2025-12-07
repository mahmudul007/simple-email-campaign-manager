<?php

namespace App\Jobs;

use App\Models\CampaignRecipient;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendCampaignEmail implements ShouldQueue
{
    use Dispatchable, Queueable;

    public $recipient;

    public function __construct(CampaignRecipient $recipient)
    {
        $this->recipient = $recipient;
    }

    public function handle()
    {
        try {
            
            sleep(1); // simulate delay - for testing purpose
            $this->recipient->status = 'sent';
            $this->recipient->save();
        } catch (\Exception $e) {
            $this->recipient->status = 'failed';
            $this->recipient->save();
        }
    }
}

