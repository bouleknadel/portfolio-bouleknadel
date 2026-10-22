import { motion } from "framer-motion";
import { useLang } from "../LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AiApproach() {
  const { t } = useLang();
  const { aiSection } = t;
  return (
    <section
      id="ai-approach"
      className="w-full border-t border-white/5 px-6 py-24 md:px-12 lg:px-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mb-12"
      >
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
          {aiSection.eyebrow}
        </div>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-white md:text-4xl">
          {aiSection.title[0]}
          <br />
          {aiSection.title[1]}
        </h2>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {aiSection.points.map((point, i) => (
          <motion.div
            key={point.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: i * 0.06 }}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            <div className="mb-4 font-mono text-xs font-bold text-indigo-300">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="mb-2 text-base font-bold text-white">{point.title}</div>
            <p className="flex-1 text-sm leading-relaxed text-slate-400">{point.body}</p>
            <div className="mt-5 text-[11px] font-semibold leading-relaxed text-slate-500">
              <span className="uppercase tracking-[0.15em]">{aiSection.seenIn}</span>{" "}
              <span className="text-slate-400">{point.projects.join(" · ")}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
