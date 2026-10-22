import { motion } from "framer-motion";
import { useLang } from "../LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Experience() {
  const { t } = useLang();
  const { experience } = t;
  return (
    <section
      id="experience"
      className="w-full border-t border-white/5 px-6 py-28 md:px-12 lg:px-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mb-16"
      >
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
          {t.experienceSection.eyebrow}
        </div>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
          {t.experienceSection.title[0]}
          <br />
          {t.experienceSection.title[1]}
        </h2>
      </motion.div>

      <div className="space-y-0 divide-y divide-white/5 border-t border-white/5">
        {experience.map((job, i) => (
          <motion.div
            key={job.company}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: i * 0.05 }}
            className="grid gap-4 py-10 md:grid-cols-[220px_1fr]"
          >
            <div>
              <div className="text-sm font-bold text-white">{job.company}</div>
              <div className="mt-1 text-xs font-semibold text-slate-500">
                {job.period}
              </div>
              <div className="text-xs text-slate-600">{job.location}</div>
            </div>
            <div>
              <div className="mb-3 text-base font-bold text-indigo-300 md:text-lg">
                {job.role}
              </div>
              <ul className="space-y-2.5">
                {job.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-sm leading-relaxed text-slate-400"
                  >
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-indigo-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
