import { motion } from "framer-motion";
import { useLang } from "../LanguageContext";
import BrandMark from "./BrandMark";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Skills() {
  const { t } = useLang();
  const { skillGroups } = t;
  return (
    <section
      id="skills"
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
          {t.skillsSection.eyebrow}
        </div>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
          {t.skillsSection.title[0]}
          <br />
          {t.skillsSection.title[1]}
        </h2>
      </motion.div>

      <div className="space-y-12">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.key}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: gi * 0.06 }}
          >
            <div className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              {group.label}
            </div>
            <div className="flex flex-wrap gap-3">
              {group.items.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.02] py-2 pl-2.5 pr-4 transition-colors hover:border-indigo-400/40"
                >
                  <BrandMark {...s} glow />
                  <span className="text-[13px] font-semibold text-slate-300">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
