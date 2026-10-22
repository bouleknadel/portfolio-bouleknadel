import { motion } from "framer-motion";
import { useLang } from "../LanguageContext";
import { formatMonth, issuers, routes } from "../data";
import BrandMark from "./BrandMark";
import ProfilePhoto from "./ProfilePhoto";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const { t, lang } = useLang();
  const { profile, education, strengths, certifications, featuredCertifications, languages } = t;
  return (
    <section
      id="about"
      className="w-full px-6 py-28 md:px-12 lg:px-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mb-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center md:gap-8"
      >
        <ProfilePhoto
          size="h-20 w-20 md:h-28 md:w-28"
          alt={`${profile.firstName} ${profile.lastName}`}
          className="ring-2 ring-indigo-400/40 ring-offset-4 ring-offset-[#05070f]"
        />
        <div className="min-w-0">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            {t.about.eyebrow}
          </div>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {t.about.title[0]}
            <br />
            {t.about.title[1]}
          </h2>
        </div>
      </motion.div>

      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Bio */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="space-y-6"
        >
          {profile.bioParagraphs.map((p, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-slate-400 md:text-lg"
            >
              {p}
            </p>
          ))}

          <div className="pt-4">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                {t.about.certifications}
              </div>
              <a
                href={routes.certifications}
                className="text-xs font-bold text-indigo-300 no-underline hover:text-indigo-200"
              >
                {t.certificationsPage.viewAll(certifications.length)}
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {featuredCertifications.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 no-underline transition-colors hover:border-indigo-400/40"
                >
                  <span className="flex items-start gap-3">
                    <BrandMark {...issuers[c.issuer]} size={32} title={c.issuer} />
                    <span className="text-xs font-semibold leading-snug text-slate-200">
                      {c.name}
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-500">
                    <span>
                      {c.issuer} · {formatMonth(c.date, lang)}
                    </span>
                    <span className="text-indigo-300 transition-colors group-hover:text-indigo-200">
                      {t.certificationsPage.verify} ↗
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {languages.map((l) => (
              <span
                key={l.name}
                className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-400"
              >
                {l.name} <span className="text-slate-600">· {l.level}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Strengths + education */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="space-y-10"
        >
          <div className="grid grid-cols-2 gap-5">
            {strengths.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-indigo-400/40"
              >
                <div className="mb-3 text-base font-bold text-white">
                  {s.title}
                </div>
                <div className="text-xs leading-relaxed text-slate-500">
                  {s.description}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              {t.about.education}
            </div>
            <div className="space-y-4 border-l border-white/10 pl-5">
              {education.map((e) => (
                <div key={e.school}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-white">
                      {e.school}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {e.period}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">{e.degree}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
