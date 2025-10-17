"use client";

import { motion } from "framer-motion";
import { FaPaintBrush, FaCode, FaLightbulb } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

const glass =
  "bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-[#10D0F4]/25";

export default function Section2() {
  const [typedText, setTypedText] = useState("");
  const fullText = "What I Do";
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Typewriter animation triggers every time it comes into view
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
    }, 100);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ amount: 0.3 }}
      className="relative py-12 text-white overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-16">
        {/* Typewriter Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
        >
          {typedText}
          <span className="border-r-4 border-white ml-1 animate-pulse"></span>
        </motion.h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Design */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #10D0F4" }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`${glass} rounded-2xl p-8 transition-all`}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaPaintBrush className="text-[#10D0F4] text-3xl" />
              <h3 className="text-2xl font-semibold text-white">
                UI / UX Design
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              I design clean, user-focused digital experiences from wireframes
              to prototypes, where every pixel and interaction serves a purpose.
            </p>
          </motion.div>

          {/* Development */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #10D0F4" }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`${glass} rounded-2xl p-8 transition-all`}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaCode className="text-[#10D0F4] text-3xl" />
              <h3 className="text-2xl font-semibold text-white">Development</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              Modern, scalable apps with React, Next.js, and Tailwind—clean
              architectures, API integrations, and smooth frontend-backend flow.
            </p>
          </motion.div>

          {/* Innovation */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #10D0F4" }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`${glass} rounded-2xl p-8 transition-all`}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaLightbulb className="text-[#10D0F4] text-3xl" />
              <h3 className="text-2xl font-semibold text-white">
                Innovation & Problem Solving
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              Turning ideas into futuristic solutions—interactive 3D UIs,
              automation, and delightful micro-interactions that push
              boundaries.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
