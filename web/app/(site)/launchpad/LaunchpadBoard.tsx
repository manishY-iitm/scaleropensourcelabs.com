"use client";

import { useEffect, useMemo, useState } from "react";
import { STAGES } from "@/content/launchpad";
import {
  emptyProgress,
  exportProgress,
  loadProgress,
  saveProgress,
  type LaunchpadProgress,
} from "@/lib/launchpadProgress";

function taskId(stageKey: string, kind: string, index: number): string {
  return `${stageKey}:${kind}:${index}`;
}

export default function LaunchpadBoard() {
  const [progress, setProgress] = useState<LaunchpadProgress>(emptyProgress);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>("understand");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveProgress(progress);
  }, [progress, loaded]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STAGES;
    return STAGES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.lessons.some((l) => l.title.toLowerCase().includes(q)),
    );
  }, [query]);

  const allIds = useMemo(
    () =>
      STAGES.flatMap((s) => [
        ...s.exercises.map((_, i) => taskId(s.key, "ex", i)),
        ...s.completion.map((_, i) => taskId(s.key, "done", i)),
      ]),
    [],
  );
  const doneCount = allIds.filter((id) => progress.checked[id]).length;
  const pct = allIds.length === 0 ? 0 : Math.round((doneCount / allIds.length) * 100);

  function toggle(id: string) {
    setProgress((p) => ({
      ...p,
      checked: { ...p.checked, [id]: !p.checked[id] },
    }));
  }

  function reset() {
    setProgress(emptyProgress());
  }

  function download() {
    const blob = new Blob([exportProgress(progress)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gsoc-launchpad-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="section py-14" aria-label="Preparation roadmap">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-display-md font-bold">Preparation roadmap</h2>
          <p className="mt-2 text-sm text-haze" role="status" aria-live="polite">
            {doneCount} of {allIds.length} tasks complete ({pct}%).
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={download}
            className="tap rounded-tile border border-seam px-4 py-3 text-sm font-medium text-ink"
          >
            Export progress
          </button>
          <button
            type="button"
            onClick={reset}
            className="tap rounded-tile border border-seam px-4 py-3 text-sm font-medium text-haze"
          >
            Reset
          </button>
        </div>
      </div>

      <div
        className="mt-6 h-2 overflow-hidden rounded-full bg-seam"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Preparation progress"
      >
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-6">
        <label htmlFor="launchpad-search" className="label">
          Search stages and lessons
        </label>
        <input
          id="launchpad-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. pull request, testing, proposal"
          className="mt-2 w-full rounded-tile border border-seam bg-sunk px-4 py-3 text-body text-ink"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-tile border border-seam bg-sunk p-6 text-haze">
          No stages match “{query}”. Try “git”, “testing”, or clear the search.
        </p>
      ) : (
        <ol className="mt-8 space-y-px overflow-hidden rounded-panel bg-seam">
          {filtered.map((s) => {
            const ids = [
              ...s.exercises.map((_, i) => taskId(s.key, "ex", i)),
              ...s.completion.map((_, i) => taskId(s.key, "done", i)),
            ];
            const done = ids.filter((id) => progress.checked[id]).length;
            const isOpen = open === s.key;
            return (
              <li key={s.key} className="bg-raise p-6 sm:p-8">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : s.key)}
                  aria-expanded={isOpen}
                  className="tap block w-full text-left"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-dust">
                    Stage {s.stage}
                  </span>
                  <span className="mt-1 block font-display text-lg font-bold text-ink">
                    {s.title}
                  </span>
                  <span className="mt-1 block text-sm text-haze">
                    {s.summary} · {done}/{ids.length} done · {s.estimate}
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div>
                      <h3 className="label">Lessons in order</h3>
                      <ul className="mt-2 space-y-2">
                        {s.lessons.map((l) => (
                          <li key={l.title} className="text-sm leading-relaxed">
                            <span className="font-medium text-ink">{l.title}. </span>
                            <span className="text-haze">{l.detail}</span>
                          </li>
                        ))}
                      </ul>
                      <h3 className="label mt-6">Prerequisites</h3>
                      <ul className="mt-2 list-disc pl-5 text-sm text-haze">
                        {s.prerequisites.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      <h3 className="label mt-6">Authoritative docs</h3>
                      <ul className="mt-2 space-y-1">
                        {s.docs.map((d) => (
                          <li key={d.url}>
                            <a
                              href={d.url}
                              target="_blank"
                              rel="noreferrer"
                              className="tap block text-sm text-accent"
                            >
                              {d.label} ↗
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="label">Checklist</h3>
                      <ul className="mt-2 space-y-2">
                        {s.exercises.map((t, i) => {
                          const id = taskId(s.key, "ex", i);
                          return (
                            <li key={id}>
                              <label className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-tile border border-seam p-3 text-sm">
                                <input
                                  type="checkbox"
                                  checked={!!progress.checked[id]}
                                  onChange={() => toggle(id)}
                                  className="mt-1 h-4 w-4"
                                />
                                <span className="text-ink">{t}</span>
                              </label>
                            </li>
                          );
                        })}
                        {s.completion.map((t, i) => {
                          const id = taskId(s.key, "done", i);
                          return (
                            <li key={id}>
                              <label className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-tile border border-seam p-3 text-sm">
                                <input
                                  type="checkbox"
                                  checked={!!progress.checked[id]}
                                  onChange={() => toggle(id)}
                                  className="mt-1 h-4 w-4"
                                />
                                <span className="text-ink">{t}</span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                      <h3 className="label mt-6">Common mistakes</h3>
                      <ul className="mt-2 list-disc pl-5 text-sm text-haze">
                        {s.mistakes.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
