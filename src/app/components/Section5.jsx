"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Facebook, Instagram, Github, Linkedin } from "lucide-react";

export default function Section5() {
  const socials = [
    {
      href: "https://www.facebook.com/profile.php?id=100008970434412",
      icon: <Facebook size={16} />,
      label: "Facebook",
    },
    {
      href: "https://www.instagram.com/ishadow_24/",
      icon: <Instagram size={16} />,
      label: "Instagram",
    },
    {
      href: "https://github.com/aayushkumar1679",
      icon: <Github size={16} />,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/ayush-kumar-9a1410271/",
      icon: <Linkedin size={16} />,
      label: "LinkedIn",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section className="px-6 md:px-8 py-20 md:py-28 text-white" id="contact">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-6"
        >
          {/* Icon */}
          <motion.div
            variants={fadeUp}
            className="mx-auto w-12 h-12 grid place-items-center"
          >
            <Mail className="w-9 h-9" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-2xl md:text-3xl font-semibold tracking-wide"
          >
            GET IN TOUCH!
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base text-white/80 leading-relaxed"
          >
            Whether there’s an idea for a project or just a wish to chat, feel
            free to reach out anytime.
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-sm md:text-base text-white/80 leading-relaxed"
          >
            ayushanandexel24@gmail.com
          </motion.h2>

          {/* Button */}
          <motion.div variants={fadeUp}>
            <Link
              href="mailto:ayushanandexel24@gmail.com"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-white text-white text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Say Hello
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom social bar */}
      <div className="mt-16">
        <div className="mx-auto max-w-5xl">
          <div className="w-full h-[72px]">
            <div className="h-full flex items-center justify-center gap-3 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 grid place-items-center bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
