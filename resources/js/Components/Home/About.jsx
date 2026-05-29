import React from 'react'

const About = () => {
    return (
        <div className="w-full" style={{ backgroundColor: '#ffffff' }}>

            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-5 md:gap-8">

                    {/* Left Column */}
                    <div className="col-span-1">
                        <div
                            className="rounded-full w-fit px-4 py-2"
                            style={{ backgroundColor: 'rgba(32,117,125,0.10)' }}
                        >
                            <h2 className="text-sm font-medium" style={{ color: '#20757D' }}>About us</h2>
                        </div>
                    </div>

                    {/* Middle Column */}
                    <div className="col-span-2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight" style={{ color: '#0d1f22' }}>
                            Connecting healthcare with{' '}
                            <span style={{ color: '#EF8354' }}>skilled, reliable professionals</span>.
                        </h1>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-2">
                        <p className="leading-relaxed" style={{ color: '#3a5a60' }}>
                            <strong className="font-semibold" style={{ color: '#0d1f22' }}>3C Nursing Agency Australia</strong>{' '}
                            is a healthcare staffing provider dedicated to connecting qualified nurses and healthcare
                            professionals with organizations that need dependable support.
                        </p>
                        <p className="mt-4 mb-5 leading-relaxed" style={{ color: '#3a5a60' }}>
                            Built on the values of{' '}
                            <strong className="font-semibold" style={{ color: '#0d1f22' }}>Caring, Compassion, and Confidence</strong>,
                            we focus on delivering workforce solutions that help healthcare facilities manage staffing
                            shortages while maintaining high standards of patient care.
                        </p>
                        <p className="leading-relaxed" style={{ color: '#3a5a60' }}>
                            Our mission is to create the perfect fit between healthcare professionals and the workplaces
                            that need them, fostering a culture of trust, flexibility, and high‑quality service that
                            supports better care for all.
                        </p>

                        {/* Divider accent */}
                        <div
                            className="mt-6 h-px w-16 rounded-full"
                            style={{ backgroundColor: '#EF8354' }}
                        />
                    </div>
                </div>
            </div>

            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "MedicalOrganization",
                    "name": "3C Nursing Agency Australia",
                    "description": "Healthcare staffing agency connecting qualified nurses and healthcare professionals with hospitals and aged care facilities across Australia.",
                    "url": "https://www.3cnursing.au",
                    "medicalSpecialty": "Nursing Staffing Services"
                }
                `}
            </script>
        </div>
    )
}

export default About
