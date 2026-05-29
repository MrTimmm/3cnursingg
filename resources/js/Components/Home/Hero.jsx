import React from "react";

const Hero = () => {
  return (
    <section
      className="relative flex w-full min-h-[88svh] items-center overflow-hidden pt-24 pb-14 sm:min-h-[92svh] sm:pb-16 lg:min-h-screen lg:pt-28 lg:pb-20"
      style={{ backgroundColor: "#f7f7f0" }}
    >

      {/* Background Image */}
      <div
        className="absolute inset-0 scale-105"
        style={{
          backgroundImage: "url('/images/Banner_high.png')",
          backgroundSize: "cover",
          backgroundPosition: "left top",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Light Gradient Overlay — fades right side to warm cream */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to left, rgba(247,247,240,0.97) 0%, rgba(247,247,240,0.88) 2%, rgba(247,247,240,0.45) 30%, transparent 80%)",
        }}
      />

      {/* Subtle teal glow accent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 72% 50%, rgba(32,117,125,0.08), transparent 55%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full  justify-end px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="max-w-xl text-right">

          {/* Eyebrow */}
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] sm:mb-4"
            style={{ color: "#20757D" }}
          >
            3C Nursing Australia
          </p>

          {/* Headline */}
          <h1
            className="mb-5 font-bold leading-[1.05] sm:mb-6"
            style={{ color: "#0d1f22", fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
          >
            Caring.<br />
            <span style={{ color: "#20757D" }}>Compassionate.</span><br />
            <span style={{ color: "#EF8354" }}>Confident.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mb-5 text-base leading-relaxed md:text-lg sm:mb-6"
            style={{ color: "#3a5a60" }}
          >
            Connecting healthcare facilities with skilled nursing professionals across Australia —
            delivering flexible, reliable staffing solutions.
          </p>

          {/* Trust Badge */}
          <div
            className="mb-6 inline-flex items-center justify-end gap-3 rounded-full px-5 py-2.5 sm:mb-8"
            style={{
              backgroundColor: "rgba(13,59,68,0.07)",
              border: "1px solid rgba(13,59,68,0.12)",
            }}
          >
            <p className="text-sm" style={{ color: "#3a5a60" }}>
              Trusted staffing partner for healthcare providers
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
