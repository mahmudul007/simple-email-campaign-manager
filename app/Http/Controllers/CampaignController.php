<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCampaignRequest;
use App\Jobs\SendCampaignEmail;
use Inertia\Inertia;
use App\Models\Campaign;
use App\Models\Contact;
use App\Services\CampaignService;

class CampaignController extends Controller
{

    private $campaignService;
    public function __construct(CampaignService $campaignService)
    {
        $this->campaignService = $campaignService;
    }

    public function index()
    {
        $campaigns = Campaign::with('recipients.contact')
            ->orderBy('created_at', 'desc')
            ->get();
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

        $this->campaignService->sendCampaignEmail($data);

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
