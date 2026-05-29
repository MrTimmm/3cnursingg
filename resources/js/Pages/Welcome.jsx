import About from '@/Components/Home/About'
import Apply from '@/Components/Home/Apply'
import FAQ from '@/Components/Home/FAQ'
import Hero from '@/Components/Home/Hero'
import HowItWorks from '@/Components/Home/HowItWorks'
import Services from '@/Components/Home/Services'
import Testimonials from '@/Components/Home/Testimonials'
import GuestLayout from '@/Layouts/GuestLayout'
import React from 'react'

const Welcome = () => {
  return (
    <GuestLayout variant="home">
      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="vacancies">
        <Apply />
      </section>

      <section id="faq">
        <FAQ />
      </section>

    </GuestLayout>

  )
}

export default Welcome
