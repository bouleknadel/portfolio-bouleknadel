import { motion } from "framer-motion";
import { useLang } from "../LanguageContext";
import { routes } from "../data";
import ProjectCaseStudy, { ProjectLink, StackList } from "./ProjectCaseStudy";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Projects() {
  const { t } = useLang();
  const { featuredProjects, projects } = t;
  return (
    <section
      id="projects"
      className="w-full border-t border-white/5 px-6 py-28 md:px-12 lg:px-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mb-16 flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            {t.projectsSection.eyebrow}
          </div>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {t.projectsSection.title[0]}
            <br />
            {t.projectsSection.title[1]}
          </h2>
        </div>
        <a
          href={routes.projects}
          className="text-sm font-bold text-indigo-300 no-underline hover:text-indigo-200"
        >
          {t.projectsSection.viewArchive(projects.length)}
        </a>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <motion.article
            key={p.key}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: (i % 2) * 0.08 }}
            className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-indigo-400/40 md:p-8"
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-indigo-300">
                {p.tag}
              </span>
              <span className="text-xs font-semibold text-slate-500">{p.status}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white">{p.title}</h3>
            <div className="mb-6 mt-1 text-xs font-semibold text-slate-500">{p.context}</div>

            <div className="flex-1">
              <ProjectCaseStudy project={p} />
            </div>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-white/5 pt-5">
              <StackList stack={p.stack} />
              <ProjectLink project={p} />
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href={routes.projects}
          className="inline-block rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-white no-underline transition-colors hover:border-indigo-400 hover:bg-white/5"
        >
          {t.projectsSection.viewArchive(projects.length)}
        </a>
      </div>
    </section>
  );
}
