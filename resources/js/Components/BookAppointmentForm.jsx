import React, { useEffect, useState } from "react";

const CloseIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BookAppointmentForm = ({ isOpen, onClose, embedded = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && !embedded) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, embedded]);

  const resetForm = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
    setFormErrors({});
    setSubmitSuccess(false);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.full_name.trim()) {
      errors.full_name = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{3,4}$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid";
    }

    if (!formData.service) {
      errors.service = "Please select a service";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const subject = encodeURIComponent(`Appointment Request: ${formData.service}`);
      const body = encodeURIComponent(
        [
          `Full Name: ${formData.full_name}`,
          `Email: ${formData.email}`,
          `Phone: ${formData.phone}`,
          `Service: ${formData.service}`,
          "",
          "Message:",
          formData.message,
        ].join("\n")
      );

      window.location.href = `mailto:admin@3cnursing.com.au?subject=${subject}&body=${body}`;

      setSubmitSuccess(true);

      setTimeout(() => {
        if (onClose && !embedded) {
          onClose();
        }
        resetForm();
      }, 3000);
    } catch (error) {
      console.error("Error preparing appointment request:", error);
      setFormErrors({ submit: "Failed to prepare the appointment request. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesList = [
    "Hire Staff",
    "Apply for Job",
    "General Inquiry",
  ];

  const formContent = (
    <div className={embedded ? "" : "relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"}>
      {!embedded && (
        <button
          onClick={() => {
            onClose();
            resetForm();
          }}
          className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Close appointment form"
        >
          <CloseIcon />
        </button>
      )}

      <h2 className="mb-2 text-2xl font-bold" style={{ color: "#0f2d2f" }}>
        Book Appointment
      </h2>
      <p className="mb-6 text-sm" style={{ color: "#4a6a6d" }}>
        Fill in the form below and we&apos;ll get back to you within 24 hours.
      </p>

      {submitSuccess ? (
        <div className="rounded-lg bg-green-50 p-4 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mb-2 font-semibold text-green-800">Appointment Request Ready</h3>
          <p className="text-sm text-green-700">
            Your mail client should open with the appointment details pre-filled.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name *"
              value={formData.full_name}
              onChange={handleInputChange}
              className={`w-full rounded-lg border p-3 outline-none transition-all focus:ring-2 ${
                formErrors.full_name ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-teal-500 focus:ring-teal-200"
              }`}
            />
            {formErrors.full_name && <p className="mt-1 text-xs text-red-500">{formErrors.full_name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full rounded-lg border p-3 outline-none transition-all focus:ring-2 ${
                formErrors.email ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-teal-500 focus:ring-teal-200"
              }`}
            />
            {formErrors.email && <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full rounded-lg border p-3 outline-none transition-all focus:ring-2 ${
                formErrors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-teal-500 focus:ring-teal-200"
              }`}
            />
            {formErrors.phone && <p className="mt-1 text-xs text-red-500">{formErrors.phone}</p>}
          </div>

          <div>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={`w-full rounded-lg border p-3 outline-none transition-all focus:ring-2 ${
                formErrors.service ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-teal-500 focus:ring-teal-200"
              }`}
            >
              <option value="">Select Service *</option>
              {servicesList.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {formErrors.service && <p className="mt-1 text-xs text-red-500">{formErrors.service}</p>}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your Message / Requirements *"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full rounded-lg border p-3 outline-none transition-all focus:ring-2 ${
                formErrors.message ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-teal-500 focus:ring-teal-200"
              }`}
            />
            {formErrors.message && <p className="mt-1 text-xs text-red-500">{formErrors.message}</p>}
          </div>

          {formErrors.submit && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {formErrors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg,#20757D,#4fb3bf)",
            }}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Sending...
              </div>
            ) : (
              "Submit Request"
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            We&apos;ll respond to your inquiry within 24 hours
          </p>
        </form>
      )}
    </div>
  );

  if (embedded) {
    return formContent;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
      style={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(6px)",
      }}
      onClick={() => {
        onClose();
        resetForm();
      }}
    >
      <div onClick={(event) => event.stopPropagation()}>{formContent}</div>
    </div>
  );
};

export default BookAppointmentForm;
