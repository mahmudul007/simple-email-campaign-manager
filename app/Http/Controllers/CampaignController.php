<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCampaignRequest;
use App\Jobs\SendCampaignEmail;
use Inertia\Inertia;
use App\Models\Campaign;
use App\Models\Contact;
use App\Services\CampaignService;
use Illuminate\Support\Facades\Request;

class CampaignController extends Controller
{
    public function index()
    {
        $campaigns = Campaign::with('recipients.contact')->get();
        return Inertia::render('Campaigns/Index', [
            'campaigns' => $campaigns,
        ]);
    }

    public function create()
    {
        $contacts = Contact::all();
        return Inertia::render('Campaigns/Create', [
            'contacts' => $contacts,
        ]);
    }

    public function store(StoreCampaignRequest $request)
    {

        $data = $request->validated();

        $campaignService = new CampaignService();
        $campaignService->sendCampaignEmail($data);

        return redirect()->route('campaigns.index')->with('success', 'Campaign queued!');
    }

    public function show(Campaign $campaign)
    {
        $campaign->load('recipients.contact');
        return Inertia::render('Campaigns/Show', [
            'campaign' => $campaign,
        ]);
    }
}
