import React, { useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Emily Carter',
    role: 'Aged Care Facility Manager',
    quote: '3C Nursing has been a reliable partner for our staffing needs. The nurses they provide are professional, adaptable, and consistently meet our standards.',
    rating: 5,
    type: 'Client',
    location: 'Sydney',
  },
  {
    id: 2,
    name: 'Daniel Mwangi',
    role: 'Registered Nurse',
    quote: 'Working with 3C Nursing has given me flexibility and great opportunities across different healthcare settings. The support from the team has been excellent.',
    rating: 5,
    type: 'Nurse',
    location: 'Melbourne',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Enrolled Nurse',
    quote: 'The onboarding process was smooth, and I was placed quickly. I appreciate how responsive and supportive the agency is throughout each assignment.',
    rating: 5,
    type: 'Nurse',
    location: 'Brisbane',
  },
]

const getColor = (name) => {
  const colors = ['#0d3b44', '#20757D', '#EF8354', '#4fb3bf', '#6ee7e1']
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

const StarIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: '#f59e0b' }}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const Testimonials = () => {
  const [active, setActive] = useState(0)

  const prev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((i) => (i + 1) % testimonials.length)

  const current = testimonials[active]
  const initial = current.name.charAt(0).toUpperCase()

  return (
    <>
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "3C Nursing Agency Australia",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "bestRating": "5",
            "ratingCount": "2400"
          }
        }
        `}
      </script>

      <section className="w-full" style={{ backgroundColor: '#f7f7f0' }}>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

            {/* Left Image */}
            <div
              className="rounded-2xl overflow-hidden relative min-h-[280px]"
              style={{ border: '1.5px solid rgba(13,31,34,0.07)' }}
            >
              <img
                src="/images/About_11.png"
                alt="Healthcare staffing professionals"
                className="w-full h-full object-cover"
              />
              {/* Light overlay badge */}
              <div
                className="absolute bottom-6 left-6 right-6 backdrop-blur-md rounded-xl p-4"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.88)',
                  border: '1px solid rgba(13,31,34,0.08)',
                }}
              >
                <p className="text-xs font-medium mb-1" style={{ color: '#3a5a60' }}>
                  Trusted by healthcare providers
                </p>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  <span className="text-sm font-semibold" style={{ color: '#0d1f22' }}>4.9 / 5.0</span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2 flex flex-col justify-between">

              {/* Header */}
              <div className="mb-6 flex items-start justify-between sm:mb-8">
                <div>
                  <div
                    className="rounded-full w-fit px-4 py-2 mb-4"
                    style={{ backgroundColor: 'rgba(32,117,125,0.10)' }}
                  >
                    <span className="text-sm font-medium" style={{ color: '#20757D' }}>Testimonials</span>
                  </div>
                  <h1 className="text-3xl font-semibold" style={{ color: '#0d1f22' }}>
                    What our clients & nurses say
                  </h1>
                </div>

                {/* Nav arrows */}
                <div className="flex gap-3 mt-1">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{
                      border: '1.5px solid rgba(13,31,34,0.15)',
                      color: '#3a5a60',
                      backgroundColor: '#ffffff',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#20757D'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(13,31,34,0.15)'}
                    aria-label="Previous testimonial"
                  >
                    ←
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: '#0d3b44', color: '#eeeede' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#032227')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0d3b44')}
                    aria-label="Next testimonial"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Quote Card */}
              <div
                className="rounded-2xl p-8 flex flex-col justify-between flex-1"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid rgba(13,31,34,0.07)',
                  boxShadow: '0 4px 24px rgba(13,31,34,0.06)',
                }}
              >
                {/* Opening quote mark */}
                <div
                  className="text-5xl font-serif leading-none mb-4 select-none"
                  style={{ color: 'rgba(32,117,125,0.20)' }}
                >
                  "
                </div>

                <p className="text-lg leading-relaxed mb-8" style={{ color: '#1a3a3f' }}>
                  {current.quote}
                </p>

                <div className="flex items-center justify-between">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                      style={{ backgroundColor: getColor(current.name) }}
                    >
                      {initial}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: '#0d1f22' }}>{current.name}</p>
                      <p className="text-sm" style={{ color: '#3a5a60' }}>{current.role}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(current.rating)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 flex gap-3 flex-wrap">
                  <button
                    className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: '#0d3b44', color: '#eeeede' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#032227')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0d3b44')}
                  >
                    Hire Staff
                  </button>
                  <button
                    className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
                    style={{
                      border: '1.5px solid rgba(13,31,34,0.18)',
                      color: '#3a5a60',
                      backgroundColor: 'transparent',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(13,31,34,0.04)';
                      e.currentTarget.style.borderColor = '#20757D';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(13,31,34,0.18)';
                    }}
                  >
                    Join as Nurse
                  </button>
                </div>
              </div>

              {/* Dots */}
              <div className="mt-4 flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? '24px' : '8px',
                      backgroundColor: i === active ? '#0d3b44' : 'rgba(13,31,34,0.18)',
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonials
