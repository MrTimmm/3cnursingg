<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApplicationsTable extends Migration
{
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('vacancy_title');
            $table->string('vacancy_type');
            $table->string('vacancy_location');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->text('address');
            $table->date('dob');
            $table->string('gender');
            
            // Documents
            $table->string('cv_path')->nullable(); // Added CV field
            $table->string('police_check_path')->nullable();
            $table->date('police_check_expiry')->nullable();
            $table->string('proof_id_path')->nullable();
            $table->date('proof_id_expiry')->nullable();
            $table->string('tfn_path')->nullable();
            $table->string('ndis_path')->nullable();
            $table->date('ndis_expiry')->nullable();
            $table->string('statutory_path')->nullable();
            $table->string('visa_path')->nullable();
            $table->date('visa_expiry')->nullable();
            $table->string('certificate_path')->nullable();
            $table->date('certificate_expiry')->nullable();
            $table->string('injury_path')->nullable();
            $table->string('cpr_path')->nullable();
            $table->date('cpr_expiry')->nullable();
            $table->string('flu_path')->nullable();
            $table->date('flu_expiry')->nullable();
            $table->string('first_aid_path')->nullable();
            $table->date('first_aid_expiry')->nullable();
            
            // COVID Vaccination
            $table->date('covid_dose1')->nullable();
            $table->date('covid_dose2')->nullable();
            $table->date('covid_dose3')->nullable();
            
            $table->enum('status', ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('applications');
    }
}