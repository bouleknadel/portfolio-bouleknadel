import { useLang } from "../LanguageContext";

export function StackList({ stack }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((s) => (
        <span
          key={s}
          className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-400"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export function ProjectLink({ project }) {
  const { t } = useLang();
  const labels = t.projectsSection.labels;
  if (!project.repo) {
    return (
      <span className="text-xs font-semibold text-slate-600">{labels.private}</span>
    );
  }
  return (
    <a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${labels.code} — ${project.title} (GitHub)`}
      className="text-xs font-bold text-indigo-300 no-underline transition-colors hover:text-indigo-200"
    >
      {labels.code} ↗
    </a>
  );
}

// Problem → role → key decisions → result. Shared by the home page cards and the archive.
export default function ProjectCaseStudy({ project }) {
  const { t } = useLang();
  const labels = t.projectsSection.labels;
  const label = "mb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500";
  return (
    <div className="space-y-5">
      <div>
        <div className={label}>{labels.problem}</div>
        <p className="text-sm leading-relaxed text-slate-300">{project.problem}</p>
      </div>
      <div>
        <div className={label}>{labels.role}</div>
        <p className="text-sm leading-relaxed text-slate-400">{project.role}</p>
      </div>
      <div>
        <div className={label}>{labels.decisions}</div>
        <ul className="space-y-2">
          {project.decisions.map((d) => (
            <li key={d} className="flex gap-3 text-sm leading-relaxed text-slate-400">
              <span className="mt-2 h-1 w-1 flex-none rounded-full bg-indigo-400" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
      {project.result && (
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] px-4 py-3">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-400">
            {labels.result}
          </div>
          <p className="text-sm font-semibold leading-relaxed text-slate-200">{project.result}</p>
        </div>
      )}
    </div>
  );
}
