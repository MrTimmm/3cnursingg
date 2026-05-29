<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'vacancy_title',
        'vacancy_type',
        'vacancy_location',
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'dob',
        'gender',
        'cv_path', // Added CV field
        'police_check_path',
        'police_check_expiry',
        'proof_id_path',
        'proof_id_expiry',
        'tfn_path',
        'ndis_path',
        'ndis_expiry',
        'statutory_path',
        'visa_path',
        'visa_expiry',
        'certificate_path',
        'certificate_expiry',
        'injury_path',
        'cpr_path',
        'cpr_expiry',
        'flu_path',
        'flu_expiry',
        'first_aid_path',
        'first_aid_expiry',
        'covid_dose1',
        'covid_dose2',
        'covid_dose3',
        'status',
        'notes'
    ];

    protected $casts = [
        'dob' => 'date',
        'police_check_expiry' => 'date',
        'proof_id_expiry' => 'date',
        'ndis_expiry' => 'date',
        'visa_expiry' => 'date',
        'certificate_expiry' => 'date',
        'cpr_expiry' => 'date',
        'flu_expiry' => 'date',
        'first_aid_expiry' => 'date',
        'covid_dose1' => 'date',
        'covid_dose2' => 'date',
        'covid_dose3' => 'date',
    ];

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getExpiringDocumentsAttribute()
    {
        $expiring = [];
        $threshold = now()->addMonth();

        $documents = [
            'police_check' => 'National Police Check',
            'proof_id' => 'Proof of ID',
            'ndis' => 'NDIS Check',
            'visa' => 'Visa',
            'certificate' => 'Certificate',
            'cpr' => 'CPR Certificate',
            'flu' => 'Flu Vaccination',
            'first_aid' => 'First Aid Certificate'
        ];

        foreach ($documents as $field => $name) {
            $expiryField = "{$field}_expiry";
            if ($this->$expiryField && $this->$expiryField <= $threshold) {
                // Calculate days until expiry using ceil to get whole days
                $daysUntilExpiry = ceil(now()->diffInDays($this->$expiryField, false));
                $expiring[] = [
                    'document' => $name,
                    'expiry_date' => $this->$expiryField,
                    'days_until_expiry' => $daysUntilExpiry
                ];
            }
        }

        return $expiring;
    }
}