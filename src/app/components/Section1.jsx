"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerChildren, floatIn } from "./motion";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";

export default function Section1() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [intensity, setIntensity] = useState(0.6);
  const [typedText, setTypedText] = useState("");
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const fullText = "Crafting immersive products with code, 3D, and motion";

  // Mouse glow
  useEffect(() => {
    const onMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIntensity(1);
    };
    const onIdle = () => setIntensity(0.4);
    window.addEventListener("mousemove", onMove);
    const idleTimer = setInterval(onIdle, 1600);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearInterval(idleTimer);
    };
  }, []);

  // Smooth glow follow
  useEffect(() => {
    let raf = 0;
    const follow = () => {
      setGlowPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1,
      }));
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(raf);
  }, [mousePos]);

  // Detect when left section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Typewriter effect per view
  useEffect(() => {
    if (!inView) {
      setTypedText("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <>
      {/* Global mouse glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] blur-[130px] transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${glowPos.x - 250}px, ${glowPos.y - 250}px)`,
          width: 400,
          height: 300,
          opacity: intensity,
          background:
            "radial-gradient(circle, rgba(0,200,255,0.5) 0%, rgba(100,0,255,0.1) 70%, transparent 100%)",
          mixBlendMode: "screen",
        }}
      />

      <section className="relative isolate overflow-hidden z-10" id="about">
        {/* Background gradient */}
        <div
          id="#about"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_30%_20%,rgba(159,37,143,0.35),transparent_60%),radial-gradient(900px_500px_at_80%_40%,rgba(37,32,96,0.75),transparent_60%),linear-gradient(120deg,#0b0b1a_0%,#15152b_100%)]"
        />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
          {/* Left content */}
          <motion.div
            ref={sectionRef}
            variants={staggerChildren}
            initial="hidden"
            animate="show"
            className="relative z-20"
          >
            <motion.span
              variants={fadeInUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur"
            >
              Full-stack Builder · Design→Deploy
            </motion.span>

            {/* 👇 Typewriter title */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl"
            >
              {typedText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[2px] h-8 bg-white ml-1 align-middle"
              />
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-4 max-w-xl text-white/70"
            >
              Interfaces and systems that scale—from Figma to Next.js, Framer
              Motion micro-interactions, payments, and AWS deploys.
            </motion.p>

            <motion.div
              variants={floatIn}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-[#252060] transition hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.6)]"
              >
                <span>Contact</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-6-6 6 6-6 6"
                  />
                </svg>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-white/80 backdrop-blur transition hover:bg-white/10"
              >
                View Projects
              </a>
            </motion.div>

            <motion.ul
              variants={fadeInUp}
              className="mt-6 flex flex-wrap gap-2 text-xs text-white/60"
            >
              {[
                "Figma",
                "Next.js",
                "Framer Motion",
                "Stripe",
                "AWS",
                "Tailwind",
              ].map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  {t}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right description card */}
          <motion.aside
            role="complementary"
            aria-label="About description"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square w-full overflow-hidden rounded-3xl p-6 sm:p-8 flex items-center justify-center"
          >
            <div className="relative z-10 text-white/80 space-y-3 text-base leading-relaxed">
              <p>
                I’m a full-stack developer and designer who builds end-to-end
                digital experiences — from concept and design to full
                deployment.
              </p>
              <p>
                My process begins in{" "}
                <span className="text-white font-medium">Figma</span>, where I
                craft intuitive layouts, define design systems, and bring ideas
                to life through clean, modern UI.
              </p>
              <p>
                Once visuals are ready, I transform them into interactive
                experiences using{" "}
                <span className="text-white font-medium">
                  React, Tailwind CSS, and Three.js
                </span>{" "}
                — adding smooth animations, 3D interactions, and immersive
                effects.
              </p>
              <p>
                On the backend, I manage APIs, authentication, and databases
                using{" "}
                <span className="text-white font-medium">
                  Node.js, Express, MongoDB, and Stripe/Razorpay
                </span>
                .
              </p>
              <p>
                I deploy everything on{" "}
                <span className="text-white font-medium">AWS</span>, with
                pipelines, domains, and optimized hosting for production.
              </p>
            </div>
          </motion.aside>
        </div>

        {/* Section 2 + 3 */}
        <motion.div className="relative z-10">
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
        </motion.div>
      </section>
    </>
  );
}
