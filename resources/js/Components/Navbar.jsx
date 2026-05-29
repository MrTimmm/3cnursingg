import React, { useEffect, useState } from "react";
import BookAppointmentForm from "@/Components/BookAppointmentForm";

const links = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Services", href: "services" },
  { label: "How It Works", href: "how-it-works" },
  { label: "Testimonials", href: "testimonials" },
  { label: "Vacancies", href: "vacancies" },
  { label: "FAQ", href: "faq" },
];

const CloseIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const getHash = () => window.location.hash.replace("#", "");

    const updateActiveSection = () => {
      const sections = links
        .map((link) => document.getElementById(link.href))
        .filter(Boolean);
      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom > 140;
      });
      if (current) { setActive(current.id); return; }
      const hash = getHash();
      if (hash) setActive(hash);
    };

    const scrollToHash = () => {
      const hash = getHash();
      if (!hash) return;
      const section = document.getElementById(hash);
      if (!section) return;
      const top = section.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      setActive(hash);
    };

    const handleScroll = () => { setScrolled(window.scrollY > 20); updateActiveSection(); };
    const handleHashChange = () => { scrollToHash(); updateActiveSection(); };

    handleScroll();
    window.setTimeout(scrollToHash, 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 88;
      window.history.replaceState(null, "", id === "hero" ? "/" : `/#${id}`);
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      setActive(id);
    } else {
      window.location.href = id === "hero" ? "/" : `/#${id}`;
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 z-[999] w-full transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "#ffffff",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: "1px solid rgba(13,31,34,0.08)",
          boxShadow: scrolled ? "0 2px 20px rgba(13,31,34,0.07)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

          {/* Logo */}
          <button onClick={() => scrollTo("hero")} aria-label="Go to homepage">
            <img src="/images/navbar-logo.svg" alt="3C Nursing" className="h-10" />
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? "#20757D" : "#3a5a60",
                    backgroundColor: isActive ? "rgba(32,117,125,0.08)" : "transparent",
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = "rgba(13,31,34,0.05)"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: "#20757D" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenForm(true)}
              className="hidden rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:scale-105 md:block"
              style={{ backgroundColor: "#0d3b44", color: "#eeeede" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#032227")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0d3b44")}
            >
              Book Appointment
            </button>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
              style={{ color: "#0d3b44" }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className="overflow-hidden transition-all duration-300 md:hidden"
          style={{
            maxHeight: menuOpen ? "520px" : "0",
            borderTop: menuOpen ? "1px solid rgba(13,31,34,0.08)" : "none",
            backgroundColor: "#ffffff",
          }}
        >
          <div className="flex flex-col gap-1 px-4 py-4">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-150"
                  style={{
                    backgroundColor: isActive ? "rgba(32,117,125,0.08)" : "transparent",
                    color: isActive ? "#20757D" : "#3a5a60",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => { setOpenForm(true); setMenuOpen(false); }}
              className="mt-3 rounded-full py-3 text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: "#0d3b44", color: "#eeeede" }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </nav>

      <BookAppointmentForm isOpen={openForm} onClose={() => setOpenForm(false)} />
    </>
  );
};

export default Navbar;