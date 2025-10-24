"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { X, Mail, Copy } from "lucide-react";

export default function SkillsDialog({ onClose, skills }) {
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const email = "ayushanandexel24@gmail.com";

  // Lock body scroll while open; preserve scroll position
  useEffect(() => {
    const { body } = document;
    const scrollY = window.scrollY;
    body.style.top = `-${scrollY}px`;
    body.classList.add("overflow-hidden");
    body.style.position = "fixed";
    body.style.width = "100%";
    return () => {
      body.classList.remove("overflow-hidden");
      body.style.position = "";
      body.style.width = "";
      body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Focus trap + Esc
  useEffect(() => {
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && focusable?.length) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {}
  }

  const cardVariants = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 10, scale: 0.98 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 360, damping: 30 },
        },
        exit: {
          opacity: 0,
          y: -6,
          scale: 0.99,
          transition: { duration: 0.18 },
        },
      };

  return (
    <motion.div
      role="document"
      aria-labelledby="skills-title"
      aria-describedby="skills-desc"
      ref={dialogRef}
      className="
        relative w-[min(92vw,1000px)] sm:w-[min(92vw,860px)]
        "
      {...cardVariants}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="
          rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10">
          <div className="min-w-0">
            <h2
              id="skills-title"
              className="truncate text-base sm:text-lg font-semibold text-white"
            >
              Core Skills & Capabilities
            </h2>
            <p
              id="skills-desc"
              className="mt-1 text-xs sm:text-sm text-white/70"
            >
              End‑to‑end delivery from concept and design to production.
            </p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1793ff]"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content for small screens */}
        <div
          className="
            max-h-[70vh] sm:max-h-[72vh] overflow-y-auto overscroll-contain
            px-4 py-4 sm:px-6 sm:py-6
          "
        >
          <section className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {/* Design & Frontend */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <h3 className="text-sm font-medium text-white/90">
                Design → Interactive
              </h3>
              <p className="mt-1 text-xs text-white/60">
                Figma systems to React/Tailwind with refined motion and 3D depth
                (Three.js).
              </p>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                {["Figma", "React", "Tailwind CSS", "Three.js"].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.02] px-3 py-1 text-xs text-white/90"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend & DevOps */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <h3 className="text-sm font-medium text-white/90">
                APIs → Production
              </h3>
              <p className="mt-1 text-xs text-white/60">
                Node/Express, auth, data, and payments with reliable pipelines
                on AWS.
              </p>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                {[
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "Stripe/Razorpay",
                  "AWS",
                ].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.02] px-3 py-1 text-xs text-white/90"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Media Craft */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 sm:col-span-2">
              <h3 className="text-sm font-medium text-white/90">Media Craft</h3>
              <p className="mt-1 text-xs text-white/60">
                Editorial‑grade video editing, thumbnail design, and photo
                finishing.
              </p>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                {["Video Editing", "Thumbnail Creation", "Photo Editing"].map(
                  (s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.02] px-3 py-1 text-xs text-white/90"
                    >
                      {s}
                    </span>
                  )
                )}
              </div>
            </div>
          </section>
        </div>

        {/* CTA (sticks below content) */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-white/10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-white/60">
              Available for end‑to‑end engagements: concept → design → build →
              deploy.
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${email}`}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1793ff] to-[#0f74d9] px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgba(23,147,255,0.35)] hover:shadow-[0_0_28px_rgba(23,147,255,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1793ff]"
                aria-label="Email Ayush"
              >
                <Mail size={16} />
                Let’s talk
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1793ff]"
                aria-label="Copy email address"
                title={email}
              >
                <Copy size={16} />
                Copy email
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
