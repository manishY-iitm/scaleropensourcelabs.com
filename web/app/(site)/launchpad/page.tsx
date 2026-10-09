import type { Metadata } from "next";
import LaunchpadBoard from "./LaunchpadBoard";
import { LAST_VERIFIED, OFFICIAL_LINKS, totalTasks } from "@/content/launchpad";

export const metadata: Metadata = {
  title: "GSoC Launchpad",
  description:
    "A beginner-to-applicant preparation roadmap for Google Summer of Code: stages, checklists, official links, and personal progress.",
};

export default function LaunchpadPage() {
  return (
    <main id="main">
      <header className="section page-top pb-4">
        <p className="chip">GSoC Launchpad</p>
        <h1 className="mt-6 max-w-4xl font-display text-display-lg font-bold leading-[1.15]">
          From zero to a prepared GSoC applicant.
        </h1>
        <p className="measure mt-4 text-body-lg text-haze">
          {totalTasks()} tasks across 10 stages. Progress is yours alone — this
          page shows preparation completed, never a selection prediction.
        </p>
        <p className="mt-3 font-mono text-xs text-dust">
          Official facts last verified: {LAST_VERIFIED}. Dates and
          organisations change yearly — confirm on the official pages below.
        </p>
      </header>

      <section className="section pt-10" aria-label="Official sources">
        <h2 className="font-display text-display-md font-bold">Official sources</h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-panel bg-seam sm:grid-cols-2">
          {OFFICIAL_LINKS.map((l) => (
            <li key={l.url} className="bg-raise p-6">
              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="tap block font-medium text-accent"
              >
                {l.label} ↗
              </a>
              <p className="mt-2 text-sm leading-relaxed text-haze">{l.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <LaunchpadBoard />
    </main>
  );
}
