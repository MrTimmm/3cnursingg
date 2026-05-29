import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

// Configure fetch-based API helper
const apiPost = async (url, formData) => {
  const response = await fetch(`http://127.0.0.1:8000${url}`, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json" },
    body: formData,
  });
  return response;
};

const vacancies = [
  {
    id: 1,
    title: "Apply Now",
    type: "Casual",
    location: "Gosford, Central coast",
    department: "Nurse",
    description:
      "Join our dedicated aged care team providing compassionate, high-quality nursing care to elderly residents. You will work closely with multidisciplinary teams to ensure the best outcomes for our clients.",
    requirements: ["AHPRA Registration", "Aged Care experience preferred", "CPR & First Aid certified"],
  },
];

const TypeBadge = ({ type }) => {
  const colors = {
    "Full-Time": { bg: "#20757D15", color: "#20757D" },
    "Part-Time": { bg: "#EF835415", color: "#EF8354" },
    Casual: { bg: "#25A22715", color: "#25A227" },
  };
  const c = colors[type] || colors["Full-Time"];
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: c.bg, color: c.color }}>
      {type}
    </span>
  );
};

// ── Sample PDF Button ─────────────────────────────────────────────────────────
const SamplePDFButton = ({ url, label = "View Sample" }) => {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 hover:opacity-80"
      style={{
        backgroundColor: "#EF835415",
        color: "#EF8354",
        border: "1px solid #EF835430",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
      title={`Open sample: ${label}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
      {label}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 shrink-0 opacity-60">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </a>
  );
};

// ── File Field ────────────────────────────────────────────────────────────────
const FileField = ({ label, name, hasExpiry = false, files, setFiles, expiries, setExpiries, sampleUrl }) => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setFiles((p) => ({ ...p, [name]: file }));
    }
  };
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: "#f8f7f3" }}>
      {/* Label row with sample PDF link */}
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <p className="text-sm font-medium" style={{ color: "#0f2d2f" }}>{label}</p>
        {sampleUrl && <SamplePDFButton url={sampleUrl} label="View Sample" />}
      </div>

      <div className={`flex ${hasExpiry ? "gap-3" : ""} flex-wrap items-center`}>
        <label
          className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-xs font-medium transition-all duration-150 hover:opacity-90"
          style={{ backgroundColor: "#20757D18", color: "#20757D", border: "1.5px dashed #20757D50" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
          </svg>
          {files[name] ? files[name].name.slice(0, 18) + "…" : "Attach File"}
          <input type="file" className="hidden" onChange={handleFile} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
        </label>

        {hasExpiry && (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="#20757D" strokeWidth="2" className="w-4 h-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <input
              type="date"
              className="rounded-lg px-3 py-2 text-xs outline-none border"
              style={{ borderColor: "#20757D30", color: "#0f2d2f" }}
              value={expiries[name] || ""}
              onChange={(e) => setExpiries((p) => ({ ...p, [name]: e.target.value }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// ── Form Modal ────────────────────────────────────────────────────────────────
const STEPS = ["Personal Details", "Documents", "COVID & First Aid", "Review"];

// Map each doc field name to its sample PDF URL (hosted files or public URLs)
// Replace these URLs with your actual hosted sample PDF URLs.
const SAMPLE_PDFS = {
  police_check: null,
  proof_id: null,
  tfn: "https://www.ato.gov.au/uploadedFiles/Content/mei/downloads/n3092.pdf",
  ndis: null,
  statutory: "https://www.ag.gov.au/sites/default/files/2020-03/commonwealth-statutory-declaration-form.pdf",
  visa: null,
  certificate: null,
  injury: '/injury.docx', // docx — no direct PDF preview; see note below
  cpr: null,
  flu: null,
  cv: null,
  first_aid: null,
};

const ApplicationModal = ({ vacancy, onClose }) => {
  const [step, setStep] = useState(0);
  const [personal, setPersonal] = useState({
    firstName: "", lastName: "", email: "", phone: "", address: "", dob: "", gender: "",
  });
  const [files, setFiles] = useState({});
  const [expiries, setExpiries] = useState({});
  const [covidDoses, setCovidDoses] = useState({ dose1: "", dose2: "", dose3: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const updatePersonal = (k, v) => setPersonal((p) => ({ ...p, [k]: v }));

  const docs = [
    { name: "police_check", label: "National Police Check for Aged Care", hasExpiry: true },
    { name: "proof_id", label: "Proof of ID Document", hasExpiry: true },
    { name: "tfn", label: "TFN Declaration Form", hasExpiry: false },
    { name: "ndis", label: "NDIS Check", hasExpiry: true },
    { name: "statutory", label: "Statutory Declaration Form", hasExpiry: false },
    { name: "visa", label: "Visa", hasExpiry: true },
    { name: "certificate", label: "Certificate III/IV / AHPRA Registration", hasExpiry: true },
    { name: "injury", label: "Pre-existing Injury Declaration Form", hasExpiry: false },
    { name: "cpr", label: "CPR Certificate", hasExpiry: true },
    { name: "flu", label: "Recent Flu Vaccination Certificate", hasExpiry: true },
    { name: "cv", label: "Curriculum Vitae (CV)", hasExpiry: false },
  ];

  const validateStep = () => {
    if (step === 0) {
      if (!personal.firstName || !personal.lastName || !personal.email || !personal.phone || !personal.address || !personal.dob || !personal.gender) {
        toast.error("Please fill in all personal details");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(personal.email)) { toast.error("Please enter a valid email address"); return false; }
      const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}$/;
      if (!phoneRegex.test(personal.phone)) { toast.error("Please enter a valid phone number"); return false; }
      return true;
    }
    if (step === 1) {
      if (!files.cv) { toast.error("Please upload your CV"); return false; }
      const requiredDocs = docs.filter(doc => doc.hasExpiry);
      const uploadedDocs = Object.keys(files).filter(key => key !== "cv").length;
      if (uploadedDocs < requiredDocs.length) {
        toast.error(`Please upload all required documents. Uploaded: ${uploadedDocs}/${requiredDocs.length}`);
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!covidDoses.dose1 || !covidDoses.dose2 || !covidDoses.dose3) { toast.error("Please enter all COVID-19 vaccination dates"); return false; }
      if (!files.first_aid) { toast.error("Please upload First Aid certificate"); return false; }
      return true;
    }
    if (step === 3) {
      if (!agreedToTerms) { toast.error("Please agree to the terms and conditions"); return false; }
      return true;
    }
    return true;
  };

  const handleContinue = () => { if (validateStep()) setStep(s => s + 1); };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("vacancy_title", vacancy.title);
      formData.append("vacancy_type", vacancy.type);
      formData.append("vacancy_location", vacancy.location);
      formData.append("first_name", personal.firstName);
      formData.append("last_name", personal.lastName);
      formData.append("email", personal.email);
      formData.append("phone", personal.phone);
      formData.append("address", personal.address);
      formData.append("dob", personal.dob);
      formData.append("gender", personal.gender);
      const docNames = ["police_check", "proof_id", "tfn", "ndis", "statutory", "visa", "certificate", "injury", "cpr", "flu", "first_aid", "cv"];
      docNames.forEach(doc => {
        if (files[doc]) formData.append(`files[${doc}]`, files[doc]);
        if (expiries[doc]) formData.append(`expiries[${doc}]`, expiries[doc]);
      });
      formData.append("covid_doses[dose1]", covidDoses.dose1);
      formData.append("covid_doses[dose2]", covidDoses.dose2);
      formData.append("covid_doses[dose3]", covidDoses.dose3);
      const response = await apiPost("/api/applications", formData);
      if (response.status === 201) {
        setSubmitted(true);
        toast.success("Application submitted successfully!");
      } else {
        const data = await response.json();
        if (response.status === 422) {
          Object.values(data.errors || {}).forEach(err => toast.error(err[0]));
        } else {
          toast.error(data?.message || "Failed to submit. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Cannot connect to server. Please make sure Laravel is running on http://127.0.0.1:8000");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>
        <div className="bg-white rounded-3xl p-12 max-w-md w-full mx-4 text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#25A22715" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#25A227" strokeWidth="2.5" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3" style={{ color: "#0f2d2f" }}>Application Submitted!</h3>
          <p className="text-sm mb-8" style={{ color: "#4a6a6d" }}>Thank you for applying to <strong>{vacancy.title}</strong>. Our team will review your application and get back to you within 3–5 business days.</p>
          <button onClick={onClose} className="px-8 py-3 rounded-full text-white text-sm font-semibold" style={{ backgroundColor: "#20757D" }}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col" style={{ maxHeight: "90vh" }}>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#EF8354" }}>Application Form</p>
              <h3 className="text-xl font-bold" style={{ color: "#0f2d2f" }}>{vacancy.title}</h3>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Step progress */}
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                    style={{ backgroundColor: i < step ? "#25A227" : i === step ? "#20757D" : "#f1f5f5", color: i <= step ? "#fff" : "#94a3b8" }}>
                    {i < step ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : i + 1}
                  </div>
                  <p className="text-xs mt-1 font-medium" style={{ color: i === step ? "#20757D" : "#94a3b8" }}>{s}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 mb-5 mx-1 transition-all duration-300" style={{ backgroundColor: i < step ? "#25A227" : "#e2e8f0" }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* Step 0 — Personal Details */}
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-sm font-semibold mb-4" style={{ color: "#0f2d2f" }}>Personal Information</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "firstName", label: "First Name", type: "text", placeholder: "Jane" },
                  { key: "lastName", label: "Last Name", type: "text", placeholder: "Smith" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "jane@email.com" },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "+61 400 000 000" },
                  { key: "dob", label: "Date of Birth", type: "date", placeholder: "" },
                ].map(f => (
                  <div key={f.key} className={f.key === "email" || f.key === "address" ? "col-span-2" : ""}>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#4a6a6d" }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={personal[f.key]}
                      onChange={e => updatePersonal(f.key, e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none border transition-colors"
                      style={{ borderColor: "#e2e8f0", color: "#0f2d2f" }}
                      onFocus={e => (e.target.style.borderColor = "#20757D")}
                      onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#4a6a6d" }}>Residential Address</label>
                  <input
                    type="text"
                    placeholder="123 Main Street, Melbourne VIC 3000"
                    value={personal.address}
                    onChange={e => updatePersonal("address", e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none border transition-colors"
                    style={{ borderColor: "#e2e8f0", color: "#0f2d2f" }}
                    onFocus={e => (e.target.style.borderColor = "#20757D")}
                    onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#4a6a6d" }}>Gender</label>
                  <select
                    value={personal.gender}
                    onChange={e => updatePersonal("gender", e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none border transition-colors"
                    style={{ borderColor: "#e2e8f0", color: personal.gender ? "#0f2d2f" : "#94a3b8" }}
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — Documents */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold mb-1" style={{ color: "#0f2d2f" }}>Required Documents</p>
              <p className="text-xs mb-4" style={{ color: "#7a9fa3" }}>
                Each document has a <span style={{ color: "#EF8354", fontWeight: 600 }}>View Sample</span> button — click it to open the template in a new tab before uploading.
              </p>
              {docs.map(d => (
                <FileField
                  key={d.name}
                  {...d}
                  files={files}
                  setFiles={setFiles}
                  expiries={expiries}
                  setExpiries={setExpiries}
                  sampleUrl={SAMPLE_PDFS[d.name]}
                />
              ))}
            </div>
          )}

          {/* Step 2 — COVID & First Aid */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm font-semibold mb-4" style={{ color: "#0f2d2f" }}>COVID-19 & First Aid</p>
              <div className="rounded-xl p-5" style={{ backgroundColor: "#f8f7f3" }}>
                <p className="text-sm font-semibold mb-1" style={{ color: "#0f2d2f" }}>COVID-19 Vaccination</p>
                <p className="text-xs mb-4" style={{ color: "#4a6a6d" }}>Minimum 3 doses required. Please enter the date of each dose.</p>
                <div className="grid grid-cols-3 gap-3">
                  {["dose1", "dose2", "dose3"].map((d, i) => (
                    <div key={d}>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#4a6a6d" }}>Dose {i + 1} Date</label>
                      <input
                        type="date"
                        value={covidDoses[d]}
                        onChange={e => setCovidDoses(p => ({ ...p, [d]: e.target.value }))}
                        className="w-full rounded-xl px-3 py-2.5 text-xs outline-none border"
                        style={{ borderColor: "#20757D30", color: "#0f2d2f" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <FileField
                name="first_aid"
                label="First Aid Document"
                hasExpiry={true}
                files={files}
                setFiles={setFiles}
                expiries={expiries}
                setExpiries={setExpiries}
                sampleUrl={SAMPLE_PDFS["first_aid"]}
              />
              <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: "#20757D10", border: "1px solid #20757D20" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#20757D" strokeWidth="2" className="w-5 h-5 shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <p className="text-xs leading-relaxed" style={{ color: "#20757D" }}>
                  All documents are stored securely and used solely for onboarding purposes in compliance with Australian privacy legislation.
                </p>
              </div>
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm font-semibold mb-4" style={{ color: "#0f2d2f" }}>Review Your Application</p>
              <div className="rounded-xl p-5 space-y-3" style={{ backgroundColor: "#f8f7f3" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#20757D" }}>Personal Details</p>
                {[["Full Name", `${personal.firstName} ${personal.lastName}`], ["Email", personal.email], ["Phone", personal.phone], ["Address", personal.address], ["DOB", personal.dob], ["Gender", personal.gender]].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-sm">
                    <span style={{ color: "#7a9fa3" }}>{l}</span>
                    <span className="font-medium" style={{ color: "#0f2d2f" }}>{v || "—"}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-5" style={{ backgroundColor: "#f8f7f3" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#20757D" }}>Documents Uploaded</p>
                <div className="space-y-2">
                  {[...docs, { name: "first_aid", label: "First Aid Document" }].map(d => (
                    <div key={d.name} className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: files[d.name] ? "#25A22720" : "#ef835420" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke={files[d.name] ? "#25A227" : "#EF8354"} strokeWidth="3" className="w-2.5 h-2.5">
                          {files[d.name]
                            ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />}
                        </svg>
                      </div>
                      <span style={{ color: files[d.name] ? "#0f2d2f" : "#94a3b8" }}>{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-5" style={{ backgroundColor: "#f8f7f3" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#20757D" }}>COVID-19 Doses</p>
                {["dose1", "dose2", "dose3"].map((d, i) => (
                  <div key={d} className="flex justify-between text-sm mb-1">
                    <span style={{ color: "#7a9fa3" }}>Dose {i + 1}</span>
                    <span className="font-medium" style={{ color: "#0f2d2f" }}>{covidDoses[d] || "—"}</span>
                  </div>
                ))}
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-0.5 accent-teal-700" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} />
                <p className="text-xs leading-relaxed" style={{ color: "#4a6a6d" }}>
                  I confirm that all information provided is accurate and complete. I consent to 3C Nursing processing my personal data for recruitment purposes.
                </p>
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => step === 0 ? onClose() : setStep(s => s - 1)}
            className="px-6 py-2.5 rounded-full text-sm font-medium border transition-colors"
            style={{ borderColor: "#e2e8f0", color: "#64748b" }}
            disabled={isSubmitting}
          >
            {step === 0 ? "Cancel" : "← Back"}
          </button>
          <div className="flex items-center gap-2">
            {STEPS.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full transition-all" style={{ backgroundColor: i === step ? "#20757D" : "#e2e8f0" }} />
            ))}
          </div>
          {step < STEPS.length - 1 ? (
            <button
              onClick={handleContinue}
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#20757D" }}
              disabled={isSubmitting}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: isSubmitting ? "#94a3b8" : "#25A227" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application ✓"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const Apply = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Toaster position="top-right" />
      <section className="w-full" style={{ backgroundColor: "#f8f7f3" }}>
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14 lg:py-16">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5" style={{ backgroundColor: "#EF835418", border: "1px solid #EF835430" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#EF8354" }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#EF8354" }}>We're Actively Hiring</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {vacancies.map((v) => (
              <div key={v.id} className="flex items-start justify-between gap-6 rounded-2xl p-6 transition-all duration-200 hover:shadow-md sm:p-8" style={{ backgroundColor: "#fff", border: "1px solid #e8e6dc" }}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <TypeBadge type={v.type} />
                    <span className="text-xs" style={{ color: "#7a9fa3" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 inline mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {v.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "#0f2d2f" }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a6a6d" }}>{v.description}</p>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <button onClick={() => setSelected(v)} className="px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg" style={{ backgroundColor: "#20757D" }}>
                    Apply Now →
                  </button>
                  <p className="text-xs" style={{ color: "#b0c4c7" }}>Takes ~5 mins</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selected && <ApplicationModal vacancy={selected} onClose={() => setSelected(null)} />}
      </section>
    </>
  );
};

export default Apply;
