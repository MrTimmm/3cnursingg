import React, { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: 'How can I hire nurses through 3C Nursing Agency?',
    answer: 'Simply contact our team with your staffing requirements, and we will match you with qualified healthcare professionals based on your needs, schedule, and facility type.',
    keywords: 'hire nurses Australia, healthcare staffing agency, nursing recruitment',
  },
  {
    id: 2,
    question: 'What types of healthcare professionals do you provide?',
    answer: 'We supply Assistant in Nursing (AIN), Enrolled Nurses (EN), and Registered Nurses (RN) to support aged care facilities and other healthcare providers.',
    keywords: 'AIN EN RN staffing, nursing roles Australia, healthcare workforce',
  },
  {
    id: 3,
    question: 'Do you offer flexible or short-term staffing?',
    answer: 'Yes, we provide flexible staffing solutions including short-term, long-term, and emergency placements to help manage workforce shortages effectively.',
    keywords: 'temporary nurses, agency nurses, short-term staffing healthcare',
  },
  {
    id: 4,
    question: 'How can I apply for nursing jobs with your agency?',
    answer: 'You can apply by submitting your application through our website or contacting our recruitment team. We will guide you through registration and placement opportunities.',
    keywords: 'nursing jobs Australia, apply nurse job, healthcare recruitment',
  },
  {
    id: 5,
    question: 'Do you accept international nurses?',
    answer: 'No, we do not accept international nurses. We only accept Registered Nurses (RNs) who are already registered with the Nursing and Midwifery Board of Australia (AHPRA).',
    keywords: 'international nurses Australia, AHPRA registered nurses, RN registration Australia',
  },
  {
    id: 6,
    question: 'How do you ensure quality and reliability of staff?',
    answer: 'All professionals are carefully screened, qualified, and assessed to ensure they meet industry standards and can deliver reliable performance in healthcare environments.',
    keywords: 'qualified nurses, staff screening, healthcare compliance',
  },
]

const FAQ = () => {
  const [open, setOpen] = useState(1)

  return (
    <>
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": ${JSON.stringify(faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
          })))},
          "provider": {
            "@type": "MedicalOrganization",
            "name": "3C Nursing Agency",
            "url": "https://www.3cnursingagency.com"
          }
        }
        `}
      </script>

      <div className="w-full" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">

            {/* Left Col */}
            <div className="col-span-1 lg:col-span-2 sm:sticky top-24">
              <div
                className="rounded-full w-fit px-4 py-2 mb-5"
                style={{ backgroundColor: 'rgba(32,117,125,0.10)' }}
              >
                <span className="text-sm font-medium" style={{ color: '#20757D' }}>FAQ</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6" style={{ color: '#0d1f22' }}>
                Questions about staffing & opportunities
              </h1>

              <p className="mb-8 text-base leading-relaxed" style={{ color: '#3a5a60' }}>
                Whether you're a healthcare provider looking for staff or a professional seeking opportunities, our team is here to support you.
              </p>

              {/* Stat block */}
              <div
                className="rounded-2xl p-6 transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: '#f7f7f0',
                  border: '1.5px solid rgba(13,31,34,0.07)',
                }}
              >
                <p className="text-4xl font-bold mb-1" style={{ color: '#0d3b44' }}>98%</p>
                <p className="text-sm" style={{ color: '#3a5a60' }}>
                  of questions resolved on first contact with our support team.
                </p>
              </div>
            </div>

            {/* Right Col — Accordion */}
            <div className="col-span-1 lg:col-span-3 flex flex-col gap-3">
              {faqs.map((faq, idx) => {
                const isOpen = open === faq.id
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      backgroundColor: isOpen ? '#ffffff' : '#f7f7f0',
                      border: `1.5px solid ${isOpen ? 'rgba(32,117,125,0.25)' : 'rgba(13,31,34,0.07)'}`,
                      boxShadow: isOpen ? '0 4px 20px rgba(32,117,125,0.08)' : 'none',
                    }}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-4 sm:py-5 text-left group focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span
                          className="text-xs font-semibold tabular-nums shrink-0 transition-colors duration-200"
                          style={{ color: isOpen ? '#20757D' : 'rgba(13,31,34,0.25)' }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span
                          className="text-sm sm:text-base font-medium transition-colors duration-200"
                          style={{ color: isOpen ? '#0d1f22' : '#3a5a60' }}
                        >
                          {faq.question}
                        </span>
                      </div>

                      {/* Toggle icon */}
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0 flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: isOpen ? '#0d3b44' : 'rgba(13,31,34,0.07)',
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300"
                          style={{
                            color: isOpen ? '#eeeede' : '#3a5a60',
                            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>

                    {/* Answer */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isOpen ? '250px' : '0px',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p
                        className="text-sm leading-relaxed pl-12 sm:pl-16 pb-5 pr-6"
                        style={{ color: '#3a5a60' }}
                      >
                        {faq.answer}
                      </p>
                      <div className="sr-only">
                        <p>Related keywords: {faq.keywords}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default FAQ
