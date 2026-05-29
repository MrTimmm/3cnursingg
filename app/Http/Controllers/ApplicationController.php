<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    public function index(Request $request)
    {
        $query = Application::query();
        
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('first_name', 'LIKE', "%{$search}%")
                  ->orWhere('last_name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%")
                  ->orWhere('vacancy_title', 'LIKE', "%{$search}%");
            });
        }
        
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }
        
        $applications = $query->orderBy('created_at', 'desc')->paginate(20);
        
        $applications->each(function($application) {
            $application->expiring_documents = $application->expiringDocuments;
        });
        
        return response()->json($applications);
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'vacancy_title' => 'required|string|max:255',
            'vacancy_type' => 'required|string|max:255',
            'vacancy_location' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'dob' => 'required|date',
            'gender' => 'required|string',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        $data = $request->except(['files', 'covid_doses', 'expiries']);
        
        // Handle file uploads - Added 'cv' to documents list
        $documents = [
            'cv', 'police_check', 'proof_id', 'tfn', 'ndis', 'statutory',
            'visa', 'certificate', 'injury', 'cpr', 'flu', 'first_aid'
        ];
        
        foreach ($documents as $doc) {
            if ($request->hasFile("files.{$doc}")) {
                $path = $request->file("files.{$doc}")->store("applications/{$doc}", 'public');
                $data["{$doc}_path"] = $path;
            }
            
            if ($request->has("expiries.{$doc}")) {
                $data["{$doc}_expiry"] = $request->input("expiries.{$doc}");
            }
        }
        
        // Handle COVID dates
        if ($request->has('covid_doses')) {
            $covid = $request->input('covid_doses');
            $data['covid_dose1'] = $covid['dose1'] ?? null;
            $data['covid_dose2'] = $covid['dose2'] ?? null;
            $data['covid_dose3'] = $covid['dose3'] ?? null;
        }
        
        $application = Application::create($data);
        
        return response()->json([
            'message' => 'Application submitted successfully',
            'application' => $application
        ], 201);
    }
    
    public function show($id)
    {
        $application = Application::findOrFail($id);
        $application->expiring_documents = $application->expiringDocuments;
        
        return response()->json($application);
    }
    
    public function update(Request $request, $id)
    {
        $application = Application::findOrFail($id);
        
        $application->update($request->only(['status', 'notes']));
        
        return response()->json([
            'message' => 'Application updated successfully',
            'application' => $application
        ]);
    }
    
    public function getExpiringDocuments()
    {
        $threshold = now()->addMonth();
        
        $applications = Application::where(function($query) use ($threshold) {
            $query->where('police_check_expiry', '<=', $threshold)
                  ->orWhere('proof_id_expiry', '<=', $threshold)
                  ->orWhere('ndis_expiry', '<=', $threshold)
                  ->orWhere('visa_expiry', '<=', $threshold)
                  ->orWhere('certificate_expiry', '<=', $threshold)
                  ->orWhere('cpr_expiry', '<=', $threshold)
                  ->orWhere('flu_expiry', '<=', $threshold)
                  ->orWhere('first_aid_expiry', '<=', $threshold);
        })->get();
        
        $expiringDocuments = [];
        
        foreach ($applications as $application) {
            $expiring = $application->expiringDocuments;
            if (!empty($expiring)) {
                $expiringDocuments[] = [
                    'application' => $application,
                    'documents' => $expiring
                ];
            }
        }
        
        return response()->json($expiringDocuments);
    }
}