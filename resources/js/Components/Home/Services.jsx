import React, { useState } from 'react';
import BookAppointmentForm from '../BookAppointmentForm';

const Services = () => {
  const [hovered, setHovered] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const leftCards = [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
      ),
      title: 'Assistant in Nursing (AIN)',
      description: 'Reliable support staff for basic patient care and daily assistance in healthcare facilities.',
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: 'Enrolled Nurse (EN)',
      description: 'Qualified enrolled nurses available for clinical support and patient monitoring.',
    },
  ];

  const rightCards = [
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        </svg>
      ),
      title: 'Registered Nurse (RN)',
      description: 'Experienced registered nurses for advanced clinical care and leadership roles.',
    },
  ];

  const ServiceCard = ({ card }) => {
    const isHovered = hovered === card.id;
    return (
      <article
        className="rounded-2xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 cursor-pointer transition-all duration-300 group"
        style={{
          backgroundColor: isHovered ? '#ffffff' : '#f7f7f0',
          border: `1.5px solid ${isHovered ? 'rgba(32,117,125,0.25)' : 'rgba(13,31,34,0.07)'}`,
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: isHovered
            ? '0 8px 32px rgba(32,117,125,0.12)'
            : '0 2px 8px rgba(13,31,34,0.05)',
        }}
        onMouseEnter={() => setHovered(card.id)}
        onMouseLeave={() => setHovered(null)}
      >
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
          style={{
            backgroundColor: isHovered ? '#0d3b44' : '#20757D',
            color: '#eeeede',
          }}
        >
          {card.icon}
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: '#0d1f22' }}>
            {card.title}
          </h3>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#3a5a60' }}>
            {card.description}
          </p>
        </div>

        <div
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: isHovered ? '#20757D' : 'transparent',
            opacity: isHovered ? 1 : 0,
          }}
        />
      </article>
    );
  };

  return (
    <>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "name": "Nursing Services - 3C Nursing Agency",
            "description": "Comprehensive nursing care services including Assistant in Nursing, Enrolled Nurse, Registered Nurse.",
            "provider": {
              "@type": "MedicalOrganization",
              "name": "3C Nursing Agency"
            }
          }
        `}
      </script>

      <section id="services" className="w-full" style={{ backgroundColor: '#f7f7f0' }}>
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <div
                className="rounded-full w-fit px-4 py-2"
                style={{ backgroundColor: 'rgba(32,117,125,0.10)' }}
              >
                <h2 className="text-sm font-medium" style={{ color: '#20757D' }}>Our Services</h2>
              </div>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ color: '#0d1f22' }}
            >
              Flexible staffing,{' '}
              <span style={{ color: '#EF8354' }}>reliable healthcare professionals</span>
            </h1>
            <p className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: '#3a5a60' }}>
              3C Nursing Agency provides professional nursing services tailored to meet diverse
              healthcare needs, from basic assistance to advanced clinical care.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8 lg:pb-16 lg:pt-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr_1fr] gap-4 md:gap-6 items-stretch">

            {/* Left Column */}
            <div className="flex flex-col gap-4">
              {leftCards.map(card => (
                <ServiceCard key={card.id} card={card} />
              ))}
            </div>

            {/* Center Image */}
            <div
              className="relative rounded-2xl overflow-hidden min-h-[300px] md:min-h-[420px] order-first md:order-none mb-4 md:mb-0"
              style={{ backgroundColor: '#dde8e8' }}
            >
              <img
                src="/images/COVER.png"
                alt="Professional nurse providing compassionate care to patient"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Light overlay instead of dark */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(247,247,240,0.55) 0%, transparent 50%)',
                }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm font-medium" style={{ color: '#0d3b44' }}>
                  Professional nursing care you can trust
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              {rightCards.map(card => (
                <ServiceCard key={card.id} card={card} />
              ))}

              {/* Book Appointment Card */}
              <article
                className="rounded-2xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 cursor-pointer transition-all duration-300 group hover:translate-y-[-2px]"
                style={{
                  backgroundColor: '#0d3b44',
                  boxShadow: '0 2px 16px rgba(13,59,68,0.18)',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#032227')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0d3b44')}
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  style={{ backgroundColor: 'rgba(238,238,222,0.15)', color: '#eeeede' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#eeeede' }}>
                    Book a Consultation
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(238,238,222,0.70)' }}>
                    Schedule a consultation with our team to discuss your staffing needs or career opportunities.
                  </p>
                  <button
                    onClick={() => setShowFormModal(true)}
                    className="mt-3 text-sm font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
                    style={{ color: '#eeeede' }}
                  >
                    Book Appointment →
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <BookAppointmentForm isOpen={showFormModal} onClose={() => setShowFormModal(false)} />
    </>
  );
};

export default Services;
