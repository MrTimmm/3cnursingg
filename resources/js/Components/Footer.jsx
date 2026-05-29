import React from 'react'

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
]

const servicesLinks = [
  { name: 'Assistant in Nursing (AIN)', href: '#' },
  { name: 'Enrolled Nurse (EN)', href: '#' },
  { name: 'Registered Nurse (RN)', href: '#' },
]

const contactDetails = [
  { name: 'Email: info@3cnursing.au', href: 'mailto:info@3cnursing.au' },
  { name: 'Phone: 0490 890 221', href: 'tel:+0490890221' },
  { name: '24/7 Support Line', href: 'tel:+0490890221' },
  { name: 'Address: 203A Gertrude Street, North Gosford, NSW 2250', href: '#' },
]

const socials = [
  {
    label: 'Twitter',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.5-8.5a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

const Footer = () => {
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: '#f7f7f0',
        borderTop: '1.5px solid rgba(13,31,34,0.08)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">

          {/* Brand column */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex justify-start">
              <img src="/images/navbar-logo.svg" alt="3C Nursing" className="h-10" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#3a5a60' }}>
              Connecting compassionate caregivers with exceptional opportunities.
              Your trusted partner in nursing excellence since 2025.
            </p>

            {/* Socials */}
            <div className="flex space-x-3 pt-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(13,31,34,0.07)',
                    color: '#3a5a60',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#0d3b44';
                    e.currentTarget.style.color = '#eeeede';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(13,31,34,0.07)';
                    e.currentTarget.style.color = '#3a5a60';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: '#0d1f22' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={`/${link.href}`}
                    className="inline-block text-sm transition-all duration-200 hover:translate-x-1"
                    style={{ color: '#3a5a60' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#20757D')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#3a5a60')}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: '#0d1f22' }}
            >
              Our Services
            </h3>
            <ul className="space-y-2">
              {servicesLinks.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="inline-block text-sm transition-all duration-200 hover:translate-x-1"
                    style={{ color: '#3a5a60' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#20757D')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#3a5a60')}
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: '#0d1f22' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-3">
              {contactDetails.map((contact) => (
                <li key={contact.name}>
                  <a
                    href={contact.href}
                    className="inline-flex items-start gap-2 text-sm transition-all duration-200 hover:translate-x-1"
                    style={{ color: '#3a5a60' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#20757D')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#3a5a60')}
                  >
                    <span className="break-words">{contact.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-center justify-between gap-4 pt-6 text-center md:flex-row md:text-left"
          style={{ borderTop: '1px solid rgba(13,31,34,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(13,31,34,0.35)' }}>
            &copy; {new Date().getFullYear()} 3C Nursing. All rights reserved.
          </p>
          {/* Optional: uncomment to show legal links */}
          {/* <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((item) => (
              <a key={item} href="#" className="text-xs transition-colors" style={{ color: 'rgba(13,31,34,0.35)' }}>
                {item}
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer