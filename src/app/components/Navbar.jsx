"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Playground", href: "#playground" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/10 transition-all duration-500 ${
        scrolled ? "bg-[#0b0b1a]/90 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
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
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-white/80 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contact"
            className="rounded-lg bg-gradient-to-r from-[#9f258f] to-[#252060] px-4 py-2 text-sm font-medium text-white shadow-[0_0_15px_rgba(159,37,143,0.4)] transition hover:shadow-[0_0_25px_rgba(159,37,143,0.7)]"
          >
            Let’s Talk
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white/80 hover:text-white transition"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute left-0 right-0 top-full bg-[#0b0b1a]/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="flex flex-col px-6 py-4 space-y-3">
              {/* Mobile brand with avatar */}
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

              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/80 hover:text-white transition"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 rounded-lg bg-gradient-to-r from-[#9f258f] to-[#252060] px-4 py-2 text-center text-sm font-medium text-white"
                onClick={() => setOpen(false)}
              >
                Let’s Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
