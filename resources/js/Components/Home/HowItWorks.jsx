import React, { useState } from 'react'

const steps = [
    {
        id: 1,
        number: '01',
        title: 'Caring',
        description: 'We prioritise respectful, professional support by ensuring every healthcare professional we place upholds patient dignity, privacy, and high standards of care.',
        bg: '#dff0f1',
        borderColor: 'rgba(32,117,125,0.18)',
        hoverBg: '#cce8ea',
        textColor: '#0d1f22',
        subColor: '#3a5a60',
        iconBg: '#20757D',
        iconColor: '#eeeede',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-4.35-9-8.5C-1 6.5 4 2 8 5c1.5 1 2.5 2 4 4 1.5-2 2.5-3 4-4 4-3 9 1.5 5 7.5-3 4.15-9 8.5-9 8.5z" />
            </svg>
        ),
    },
    {
        id: 2,
        number: '02',
        title: 'Compassionate',
        description: 'We connect healthcare providers with professionals who bring empathy and understanding into every environment, contributing to positive patient and workplace experiences.',
        bg: '#fef9e7',
        borderColor: 'rgba(239,131,84,0.18)',
        hoverBg: '#fdf0cc',
        textColor: '#0d1f22',
        subColor: '#3a5a60',
        iconBg: '#EF8354',
        iconColor: '#ffffff',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-3-2-5-4-5S4 8 4 11s2 5 4 5 4-2 4-5zm0 0c0-3 2-5 4-5s4 2 4 5-2 5-4 5-4-2-4-5z" />
            </svg>
        ),
    },
    {
        id: 3,
        number: '03',
        title: 'Confident',
        description: 'We place skilled and reliable professionals who can work independently, adapt quickly, and deliver consistent performance across healthcare settings.',
        bg: '#f7f7f0',
        borderColor: 'rgba(13,31,34,0.09)',
        hoverBg: '#eeeede',
        textColor: '#0d1f22',
        subColor: '#3a5a60',
        iconBg: '#0d3b44',
        iconColor: '#eeeede',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z" />
            </svg>
        ),
    },
]

const HowItWorks = () => {
    const [hovered, setHovered] = useState(null)

    return (
        <div className="w-full" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:py-16">

                {/* Header */}
                <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end sm:gap-0">
                    <div>
                        <div
                            className="rounded-full w-fit px-4 py-2"
                            style={{ backgroundColor: 'rgba(32,117,125,0.10)' }}
                        >
                            <h2 className="text-sm font-medium" style={{ color: '#20757D' }}>Our Values</h2>
                        </div>
                        <h1
                            className="max-w-lg text-3xl sm:text-4xl md:text-5xl mt-4 leading-tight font-bold"
                            style={{ color: '#0d1f22' }}
                        >
                            The values behind every placement
                        </h1>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {steps.map(step => {
                        const isHovered = hovered === step.id
                        return (
                            <article
                                key={step.id}
                                className="rounded-2xl p-8 flex flex-col gap-6 cursor-pointer transition-all duration-300"
                                style={{
                                    backgroundColor: isHovered ? step.hoverBg : step.bg,
                                    border: `1.5px solid ${isHovered ? step.borderColor.replace('0.18', '0.35') : step.borderColor}`,
                                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                                    boxShadow: isHovered
                                        ? '0 12px 40px rgba(13,31,34,0.10)'
                                        : '0 2px 8px rgba(13,31,34,0.05)',
                                }}
                                onMouseEnter={() => setHovered(step.id)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <div className="flex items-center justify-between">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                                        style={{
                                            backgroundColor: step.iconBg,
                                            color: step.iconColor,
                                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                        }}
                                    >
                                        {step.icon}
                                    </div>
                                    <span
                                        className="text-4xl font-bold select-none"
                                        style={{ color: step.textColor, opacity: 0.12 }}
                                    >
                                        {step.number}
                                    </span>
                                </div>

                                <div>
                                    <h3
                                        className="text-xl font-semibold mb-3"
                                        style={{ color: step.textColor }}
                                    >
                                        {step.title}
                                    </h3>
                                    <p
                                        className="text-sm leading-relaxed"
                                        style={{ color: step.subColor }}
                                    >
                                        {step.description}
                                    </p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HowItWorks
