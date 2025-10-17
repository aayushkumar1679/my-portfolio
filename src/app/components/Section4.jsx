"use client";

import { motion } from "framer-motion";
import { Cpu, Handshake, Database, Globe } from "lucide-react";

const cards = [
  {
    icon: <Cpu size={26} />,
    title: "React",
    desc: "Clean components with accessible patterns and delightful micro‑interactions.",
    glow: "from-[#b26cff] via-[#d9a7ff] to-[#b26cff]",
    ring: "shadow-[0_0_30px_6px_rgba(178,108,255,0.45)]",
  },
  {
    icon: <Handshake size={26} />,
    title: "AI/UX",
    desc: "Human‑centered flows augmented with AI prompts, hints, and faster inputs.",
    glow: "from-[#3dd6ff] via-[#59f1ff] to-[#3dd6ff]",
    ring: "shadow-[0_0_30px_6px_rgba(61,214,255,0.45)]",
  },
  {
    icon: <Database size={26} />,
    title: "Back‑E.",
    desc: "Lean APIs with input validation, caching, and clean data contracts.",
    glow: "from-[#35f0ff] via-[#66ffff] to-[#35f0ff]",
    ring: "shadow-[0_0_30px_6px_rgba(53,240,255,0.45)]",
  },
  {
    icon: <Globe size={26} />,
    title: "Deployed",
    desc: "CI/CD shipping to edge runtimes with observability and budgets.",
    glow: "from-[#35f0ff] via-[#66ffff] to-[#35f0ff]",
    ring: "shadow-[0_0_30px_6px_rgba(53,240,255,0.45)]",
  },
];

const container = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
};

export default function Section4() {
  return (
    <section className="px-6 md:px-8 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Projects
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/60">
            A few highlighted areas that reflect design‑engineering craft and
            polish.
          </p>
        </div>

        {/* Grid */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {cards.map((c, i) => (
            <motion.li key={i} variants={item} className="group text-center">
              {/* Neon Hexagon */}
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="relative mx-auto w-28 h-28 md:w-32 md:h-32"
              >
                {/* Outer glow ring using conic gradient border */}
                <div
                  className={`absolute inset-0 rounded-[20%] p-[2px]
                              bg-[conic-gradient(var(--tw-gradient-stops))]
                              from-transparent via-white/40 to-transparent
                              ${c.ring}
                              opacity-70 group-hover:opacity-100 transition-opacity`}
                  style={{ borderRadius: "24px" }}
                />

                {/* Hexagon via clip-path and animated gradient stroke */}
                <div className="absolute inset-0 grid place-items-center">
                  <div
                    className={`relative size-24 md:size-28
                                [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0%_50%)]
                                bg-transparent`}
                  >
                    {/* Border glow layer */}
                    <div
                      className={`absolute inset-0 rounded-none
                                  [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0%_50%)]
                                  p-[3px] bg-gradient-to-r ${c.glow} opacity-80`}
                    >
                      <div className="w-full h-full bg-black/30 [clip-path:inherit]" />
                    </div>

                    {/* Soft neon aura */}
                    <div
                      className="absolute -inset-2 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity
                                 bg-cyan-400/0"
                      style={{
                        background:
                          "radial-gradient(60% 60% at 50% 50%, rgba(98,228,255,0.30), transparent 70%)",
                      }}
                    />
                  </div>
                </div>

                {/* Center icon on a subtle chip */}
                <div className="absolute inset-0 grid place-items-center">
                  <div className="rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 px-3 py-2 text-cyan-50">
                    {c.icon}
                  </div>
                </div>
              </motion.div>

              {/* Title */}
              <div className="mt-5 text-white font-medium tracking-wide">
                {c.title}
              </div>

              {/* Description */}
              <p className="mt-2 text-xs leading-5 text-white/70 max-w-[22ch] mx-auto">
                {c.desc}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
