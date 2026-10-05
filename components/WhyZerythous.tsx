"use client";

import { motion } from "framer-motion";

const principles = [
  { id: "01", title: "ENGINEERING FIRST", desc: "We prioritize robust architecture over quick hacks. Solid foundations create lasting products." },
  { id: "02", title: "AI WITH PURPOSE", desc: "Intelligence integrated to solve real problems, not just to add buzzwords to a pitch deck." },
  { id: "03", title: "PRODUCT THINKING", desc: "Every technical decision is weighed against its impact on the end-user experience." },
  { id: "04", title: "BUILT TO SCALE", desc: "Systems designed to handle growth smoothly, keeping your business running without bottlenecks." },
];

export default function WhyZerythous() {
  return (
    <section className="py-32 md:py-48 bg-[#FFFFFF]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-5xl sm:text-7xl md:text-[90px] lg:text-[120px] font-medium tracking-tight text-[#050505] leading-none">
            We don&apos;t add <br />
            <span className="text-[#52525B]">complexity.</span><br />
            We remove it.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-12 md:gap-20">
          {principles.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 border-t border-[rgba(0,0,0,0.08)] pt-12"
            >
              <div className="font-mono text-2xl md:text-3xl text-accent-blue opacity-80 shrink-0 w-16">
                {p.id}
              </div>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium text-[#050505] tracking-tight md:w-1/2">
                {p.title}
              </h3>
              <p className="text-lg md:text-xl text-[#52525B] font-light leading-relaxed md:w-1/2 mt-4 md:mt-0">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
