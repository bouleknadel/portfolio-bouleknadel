import { motion } from "framer-motion";
import { useLang } from "../LanguageContext";
import CvMenu from "./CvMenu";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Contact() {
  const { t } = useLang();
  const { profile } = t;
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden border-t border-white/5 px-6 py-32 md:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.16),transparent_55%)]" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
          {t.contact.eyebrow}
        </div>
        <h2 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
          {t.contact.title[0]}
          <br />
          {t.contact.title[1]}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
          {profile.availability} {t.contact.body}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent(t.contact.mailSubject)}`}
            className="rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 px-8 py-4 text-sm font-bold text-white no-underline shadow-[0_15px_40px_rgba(99,102,241,0.4)] transition-transform hover:-translate-y-0.5"
          >
            {t.contact.send}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white no-underline transition-colors hover:border-indigo-400 hover:bg-white/5"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white no-underline transition-colors hover:border-indigo-400 hover:bg-white/5"
          >
            GitHub
          </a>
          <CvMenu align="center" />
        </div>

        <div className="mt-10 text-sm font-semibold text-slate-500">
          <a
            href={`mailto:${profile.email}`}
            className="break-all text-slate-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-indigo-400"
          >
            {profile.email}
          </a>{" "}
          · {profile.location}
        </div>
      </motion.div>
    </section>
  );
}
