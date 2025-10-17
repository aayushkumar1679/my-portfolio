"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

export default function Section3() {
  const fullText = "My Work Experience";
  const [text, setText] = useState("");

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    if (isInView) {
      setText(""); // reset
      let i = 0;
      const interval = setInterval(() => {
        setText(fullText.slice(0, i + 1));
        i++;
        if (i === fullText.length) clearInterval(interval);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const items = [
    {
      role: "Software Engineer – Finapsys Consultancy Services Pvt Ltd",
      time: "Oct 2024 – Present · Maharashtra, India",
      url: "https://finapsys.co.in/",
      points: [
        "Created wireframes and interactive prototypes in Figma, translating design concepts into responsive websites using React, Tailwind CSS, and modern frontend practices.",
      ],
    },
    {
      role: "Frontend Web Developer Intern – Raise Digital",
      time: "2023 · Remote",
      url: "https://raise.digital/",
      points: [
        "Built responsive UI components using HTML5, CSS3, Bootstrap, and JavaScript.",
        "Improved website performance and accessibility (Core Web Vitals optimization).",
        "Ensured UI consistency by collaborating with designers in Figma.",
      ],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="experience" ref={ref} className="relative px-6 py-16 md:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle,rgba(159,37,143,0.25),transparent_70%)] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl relative z-10 space-y-8 text-center">
        {/* Typewriter Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight"
        >
          {text}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-1 h-6 bg-white ml-1 align-middle"
          />
        </motion.h2>

        {/* Experience Cards */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="space-y-6"
        >
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemAnim}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="relative group overflow-hidden rounded-xl  transition"
            >
              {/* Glass overlay: only visible on hover */}
              <Link href={item.url} target="_blank" rel="noopener noreferrer">
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0
                           group-hover:opacity-100 transition-opacity duration-300
                           bg-white/5 backdrop-blur-md ring-1 ring-white/10"
                />

                {/* Optional glow hotspot on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0
                           group-hover:opacity-100 transition-opacity duration-500
                           bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] blur-2xl"
                />

                {/* Content */}
                <div className="relative p-6 text-left">
                  <div className="flex">
                    <h3 className="text-white text-lg font-semibold">
                      {item.role}
                    </h3>
                    <span className=" pt-2  text-cyan-600">
                      <MoveUpRight className="h-[15px] w-[15px] pl-1" />
                    </span>
                  </div>

                  <p className="text-white/70 text-sm mt-1">{item.time}</p>
                  <ul className="mt-3 space-y-2">
                    {item.points.map((p, i) => (
                      <li
                        key={i}
                        className="text-white/80 text-sm leading-relaxed flex gap-2"
                      >
                        <span className="text-cyan-600 font-semibold">•</span>{" "}
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
