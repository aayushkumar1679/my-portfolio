"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import SkillsDialog from "./SkillsDialog";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = useMemo(
    () => [
      { name: "About", href: "#about" },
      { name: "Passion", href: "#passion" },
      { name: "Experience", href: "#experience" },
      { name: "Skills", href: "#skills" },
      { name: "Projects", href: "#projects" },
      { name: "Contact", href: "#contact" },
    ],
    []
  );

  const skills = useMemo(
    () => [
      "React",
      "Tailwind CSS",
      "Three.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe/Razorpay",
      "AWS",
      "Figma",
      "Video Editing",
      "Thumbnail Creation",
      "Photo Editing",
    ],
    []
  );

  const navVariants = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { y: -80, opacity: 0 },
        animate: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const menuVariants = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
      };

  return (
    <>
      <motion.nav
        initial={navVariants.initial}
        animate={navVariants.animate}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/10 backdrop-blur-xl ${
          scrolled ? "bg-[#0b0b1a]/90 shadow-lg" : "bg-transparent"
        }`}
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="#home"
            className="flex items-center gap-3"
            aria-label="Ayush Kumar - Home"
          >
            <Image
              src="/profile.png"
              alt="Ayush Kumar"
              width={32}
              height={32}
              priority
              className="rounded-full aspect-square object-cover ring-1 ring-white/15"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-[#eccae8] to-[#cfccee] bg-clip-text text-transparent tracking-wide">
              Ayush Kumar
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) =>
              link.name === "Skills" ? (
                <button
                  key={link.name}
                  className="text-sm text-white/80 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1793ff] focus-visible:ring-offset-2"
                  onClick={() => setSkillsOpen(true)}
                  aria-haspopup="dialog"
                  aria-controls="skills-dialog"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  scroll
                  className="text-sm text-white/80 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </Link>
              )
            )}

            <a
              href="mailto:ayushanandexel24@gmail.com"
              className="rounded-lg bg-gradient-to-r from-[#9f258f] to-[#252060] px-4 py-2 text-sm font-medium text-white shadow-[0_0_15px_rgba(159,37,143,0.4)] transition hover:shadow-[0_0_25px_rgba(159,37,143,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1793ff]"
              aria-label="Email Ayush"
            >
              <span className="inline-flex items-center gap-2">
                <Mail size={16} /> Let’s Talk
              </span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white/80 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1793ff]"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={menuVariants.initial}
              animate={menuVariants.animate}
              exit={menuVariants.exit}
              className="md:hidden absolute left-0 right-0 top-full bg-[#0b0b1a]/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="flex flex-col px-6 py-4 space-y-3">
                {/* Mobile brand */}
                <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                  <Image
                    src="/profile.png"
                    alt="Ayush Kumar"
                    width={28}
                    height={28}
                    className="rounded-full aspect-square object-cover ring-1 ring-white/15"
                  />
                  <span className="text-base font-semibold bg-gradient-to-r from-[#eccae8] to-[#cfccee] bg-clip-text text-transparent">
                    Ayush Kumar
                  </span>
                </div>

                {links.map((link) =>
                  link.name === "Skills" ? (
                    <button
                      key={link.name}
                      className="text-sm text-white/80 hover:text-white transition text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1793ff]"
                      onClick={() => {
                        setOpen(false);
                        setSkillsOpen(true);
                      }}
                      aria-haspopup="dialog"
                      aria-controls="skills-dialog"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      scroll
                      className="text-sm text-white/80 hover:text-white transition"
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )
                )}

                <a
                  href="mailto:ayushanandexel24@gmail.com"
                  className="mt-2 rounded-lg bg-gradient-to-r from-[#9f258f] to-[#252060] px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1793ff]"
                  onClick={() => setOpen(false)}
                  aria-label="Email Ayush"
                >
                  Let’s Talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Skills popup */}
      <AnimatePresence>
        {skillsOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[60]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="skills-title"
            aria-describedby="skills-desc"
            id="skills-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSkillsOpen(false)}
          >
            <SkillsDialog
              onClose={() => setSkillsOpen(false)}
              skills={skills}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
