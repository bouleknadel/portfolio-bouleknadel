import { useRef } from "react";
import { motion } from "framer-motion";
import Scene3D from "./Scene3D";
import { useLang } from "../LanguageContext";

export default function Hero() {
  const { t } = useLang();
  const { profile } = t;
  const textRef = useRef(null);
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 pt-28 md:px-12 lg:px-20"
    >
      {/* 3D background: full-width particles, laptop composed on the right (lg+) */}
      <div className="pointer-events-none absolute inset-0">
        <Scene3D avoidRef={textRef} />
      </div>

      {/* gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.14),transparent_55%)]" />

      <div ref={textRef} className="relative z-10 max-w-xl lg:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-indigo-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          {profile.availability}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[12vw] font-extrabold leading-[0.92] tracking-tight text-white sm:text-[9vw] md:text-[6.4vw] lg:text-[90px]"
        >
          {profile.firstName}
          <br />
          <span className="bg-gradient-to-br from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
            {profile.lastName}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl"
        >
          {profile.title} <span className="text-slate-500">—</span>{" "}
          {profile.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 px-8 py-4 text-sm font-bold text-white no-underline shadow-[0_15px_40px_rgba(99,102,241,0.4)] transition-transform hover:-translate-y-0.5"
          >
            {t.hero.viewWork}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white no-underline transition-colors hover:border-indigo-400 hover:bg-white/5"
          >
            {t.hero.contact}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex items-center gap-5 text-slate-500"
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-slate-400 no-underline transition-colors hover:text-white"
          >
            GitHub
          </a>
          <span className="h-1 w-1 rounded-full bg-slate-700" />
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-slate-400 no-underline transition-colors hover:text-white"
          >
            LinkedIn
          </a>
          <span className="h-1 w-1 rounded-full bg-slate-700" />
          <span className="text-sm font-semibold">{profile.location}</span>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-6 hidden text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 md:left-12 lg:left-20 md:block"
      >
        {t.hero.scroll}
      </motion.div>
    </section>
  );
}
