"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { X, Mail, Copy } from "lucide-react";

export default function SkillsDialog({ onClose, skills }) {
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const email = "ayushanandexel24@gmail.com";

  // Focus trap and Esc to close
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
        // cycle focus
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

  function onContainerClick(e) {
    e.stopPropagation(); // prevent backdrop close
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      // no-op
    }
  }

  const cardVariants = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.96, y: 8 },
        animate: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: "spring", stiffness: 380, damping: 28 },
        },
        exit: {
          opacity: 0,
          scale: 0.98,
          y: -6,
          transition: { duration: 0.15 },
        },
      };

  return (
    <motion.div
      ref={dialogRef}
      className="relative w-[min(96vw,760px)]"
      onClick={onContainerClick}
      {...cardVariants}
    >
      <div className="rounded-2xl border sm:mt-4 border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2
              id="skills-title"
              className="text-lg font-semibold tracking-wide text-white"
            >
              Core Skills & Capabilities
            </h2>
            <p id="skills-desc" className="mt-1 text-sm text-white/70">
              Full‑stack delivery from concept and design to production with
              advanced visual craft.
            </p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1793ff] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label="Close skills dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <section className="grid gap-6 md:grid-cols-2">
            {/* Design & Frontend */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-sm font-medium text-white/90">
                Design → Interactive
              </h3>
              <p className="mt-1 text-xs text-white/60">
                Figma systems to React/Tailwind with refined motion and 3D depth
                (Three.js).
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
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
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-sm font-medium text-white/90">
                APIs → Production
              </h3>
              <p className="mt-1 text-xs text-white/60">
                Node/Express, auth, data, and payments with reliable pipelines
                on AWS.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
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
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 md:col-span-2">
              <h3 className="text-sm font-medium text-white/90">Media Craft</h3>
              <p className="mt-1 text-xs text-white/60">
                Editorial‑grade video editing, thumbnail design, and photo
                finishing for launch‑ready assets.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
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

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-white/60">
              Available for end‑to‑end engagements: concept → design → build →
              deploy.
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#1793ff] to-[#0f74d9] px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgba(23,147,255,0.35)] hover:shadow-[0_0_28px_rgba(23,147,255,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1793ff]"
                aria-label="Email Ayush"
              >
                <Mail size={16} />
                Let’s talk
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1793ff]"
                aria-label="Copy email address"
                title={email}
              >
                <Copy size={16} />
                Copy email
              </button>
            </div>
          </div>
        </div>

        {/* Accent ring */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_120px_-40px_rgba(23,147,255,0.45)]" />
      </div>
    </motion.div>
  );
}
