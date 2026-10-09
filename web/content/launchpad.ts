// GSoC LAUNCHPAD content: the 10 preparation stages, official links, and the
// verification date.
//
// One module owns this topic so no other file restates it — see lookup.ts
// convention. Dates and org lists are deliberately NOT hardcoded here: GSoC
// dates move yearly, so this module links to the official pages and stamps
// LAST_VERIFIED instead of asserting a deadline.

export type LaunchpadStage = {
  key: string;
  stage: number;
  title: string;
  summary: string;
  prerequisites: string[];
  lessons: { title: string; detail: string }[];
  exercises: string[];
  estimate: string;
  completion: string[];
  mistakes: string[];
  docs: { label: string; url: string }[];
};

export const LAST_VERIFIED = "2026-10-09";

export const OFFICIAL_LINKS: { label: string; url: string; note: string }[] = [
  {
    label: "Google Summer of Code",
    url: "https://summerofcode.withgoogle.com",
    note: "Program rules, annual dates, organisations, and proposal submission.",
  },
  {
    label: "GSoC contributor guide",
    url: "https://developers.google.com/open-source/gsoc/resources/guide",
    note: "What contributors are expected to do, step by step.",
  },
  {
    label: "GSoC organisations",
    url: "https://summerofcode.withgoogle.com/organizations",
    note: "Year-specific list. Check the current edition before picking an org.",
  },
  {
    label: "Git documentation",
    url: "https://git-scm.com/doc",
    note: "Authoritative Git reference.",
  },
  {
    label: "GitHub skills",
    url: "https://skills.github.com",
    note: "Free interactive courses for GitHub flow.",
  },
];

export const STAGES: LaunchpadStage[] = [
  {
    key: "understand",
    stage: 1,
    title: "Understand GSoC and verify eligibility",
    summary: "What GSoC is, who can apply, and what a contributor actually does.",
    prerequisites: ["None. Start here."],
    lessons: [
      { title: "What GSoC is", detail: "A remote mentorship programme where contributors work on open-source projects over the summer." },
      { title: "Who is eligible", detail: "Read the official rules for the current year. Do not rely on last year's summary." },
      { title: "What contributors do", detail: "Pick an org, contribute before applying, write a project proposal, work with a mentor." },
    ],
    exercises: ["Read the official contributor guide end to end.", "Write down in one paragraph why you want to apply."],
    estimate: "Estimate: 1 week, a few hours total.",
    completion: ["You can explain GSoC to a friend.", "You have read the current-year rules."],
    mistakes: ["Applying without any prior contribution to the org.", "Trusting undated blog posts over official docs."],
    docs: [{ label: "GSoC contributor guide", url: "https://developers.google.com/open-source/gsoc/resources/guide" }],
  },
  {
    key: "language",
    stage: 2,
    title: "Choose a language and learn fundamentals",
    summary: "One language, well practised: variables, control flow, functions, data structures.",
    prerequisites: ["Stage 1 complete."],
    lessons: [
      { title: "Pick one language", detail: "Python or JavaScript are common in GSoC orgs. Pick the one your target orgs use." },
      { title: "Core syntax", detail: "Variables, loops, conditionals, functions, lists, maps, error handling." },
      { title: "Standard library basics", detail: "Files, HTTP requests, JSON, testing basics." },
    ],
    exercises: ["Solve 20 beginner problems in your language.", "Build a CLI todo app with file storage."],
    estimate: "Estimate: 6–8 weeks at 1 hour a day.",
    completion: ["You can write and debug a 200-line program alone.", "You can read existing code and explain what it does."],
    mistakes: ["Switching languages every week.", "Watching tutorials without writing code."],
    docs: [{ label: "freeCodeCamp core curriculum", url: "https://www.freecodecamp.org/learn" }],
  },
  {
    key: "git",
    stage: 3,
    title: "Command line, Git, GitHub, and code review",
    summary: "Fork, branch, commit, push, pull request, respond to review.",
    prerequisites: ["Stage 2 complete."],
    lessons: [
      { title: "Command line", detail: "Navigate, create, move, and inspect files from a terminal." },
      { title: "Git basics", detail: "Init, add, commit, branch, merge, rebase, remote." },
      { title: "GitHub flow", detail: "Fork, clone, branch, push, open a pull request, address review comments." },
      { title: "Issues and reviews", detail: "Read issue templates, reproduce bugs, review someone else's PR." },
    ],
    exercises: ["Fork a repo, fix a typo, open a PR.", "Review a peer's PR with two concrete comments."],
    estimate: "Estimate: 2–3 weeks.",
    completion: ["You have merged at least one PR you authored.", "You can resolve a merge conflict."],
    mistakes: ["Committing secrets or node_modules.", "One giant commit instead of small scoped ones."],
    docs: [
      { label: "Git documentation", url: "https://git-scm.com/doc" },
      { label: "GitHub skills", url: "https://skills.github.com" },
    ],
  },
  {
    key: "stack",
    stage: 4,
    title: "Stack, testing, debugging, and documentation",
    summary: "The tooling around code: tests, debuggers, docs, linters.",
    prerequisites: ["Stages 2–3 complete."],
    lessons: [
      { title: "Testing basics", detail: "Unit tests, running a suite, reading failures." },
      { title: "Debugging", detail: "Reproduce first, isolate, use the debugger and logs." },
      { title: "Documentation", detail: "README, docstrings, changelog entries." },
    ],
    exercises: ["Add a test for an untested function in a practise repo.", "Document a module you wrote."],
    estimate: "Estimate: 2–3 weeks.",
    completion: ["You can add a passing test to an existing suite.", "You can file a bug report with reproduction steps."],
    mistakes: ["Skipping tests because the change is small.", "Undocumented setup steps only you know."],
    docs: [{ label: "Google testing blog", url: "https://testing.googleblog.com" }],
  },
  {
    key: "orgs",
    stage: 5,
    title: "Explore mentoring organisations",
    summary: "Find orgs whose stack matches yours. Read their ideas lists and contributor guides.",
    prerequisites: ["Stages 1–4 complete."],
    lessons: [
      { title: "Browse the org list", detail: "Use the current-year GSoC organisation list, not a historical one." },
      { title: "Read contributor guides", detail: "Setup, communication channels, and how they triage beginner issues." },
      { title: "Compare project ideas", detail: "Match ideas to skills you already have, not skills you plan to learn." },
    ],
    exercises: ["Shortlist 3 orgs with reasons and links.", "Join one org's chat and introduce yourself."],
    estimate: "Estimate: 1–2 weeks.",
    completion: ["You have a shortlist of 3 orgs with links.", "You know each org's chat and issue tracker."],
    mistakes: ["Picking an org with a stack you have never used.", "Treating historical org lists as current."],
    docs: [{ label: "GSoC organisations", url: "https://summerofcode.withgoogle.com/organizations" }],
  },
  {
    key: "codebase",
    stage: 6,
    title: "Set up a repo locally and study its architecture",
    summary: "Clone, build, run the tests, map the architecture, find beginner tasks.",
    prerequisites: ["Stages 1–5 complete."],
    lessons: [
      { title: "Local setup", detail: "Follow the org's setup guide. Record every step that fails." },
      { title: "Run and test", detail: "Run the app and its test suite before changing anything." },
      { title: "Map the architecture", detail: "Entry point, modules, data flow, config." },
    ],
    exercises: ["Get the test suite green locally.", "Draw a one-page architecture map of the repo."],
    estimate: "Estimate: 2 weeks per repo.",
    completion: ["The project runs locally.", "You can name the three most important modules."],
    mistakes: ["Changing code before the suite passes.", "Skipping the setup docs and guessing."],
    docs: [{ label: "GitHub docs: cloning", url: "https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository" }],
  },
  {
    key: "contribute",
    stage: 7,
    title: "Make meaningful contributions",
    summary: "Small, reviewed, merged work. Communicate respectfully with maintainers.",
    prerequisites: ["Stages 1–6 complete."],
    lessons: [
      { title: "Pick beginner tasks", detail: "Labelled good-first-issues in YOUR shortlisted org." },
      { title: "Write reviewable PRs", detail: "Small scope, tests, clear description, linked issue." },
      { title: "Respond to review", detail: "Answer every comment, push fixes, re-request review politely." },
    ],
    exercises: ["Merge 2–3 small PRs in your shortlisted orgs.", "Help another newcomer set up the repo."],
    estimate: "Estimate: 6–10 weeks of steady contributions.",
    completion: ["At least 2 merged PRs you can link in a proposal.", "You know at least one maintainer by name."],
    mistakes: ["One large rewrite as a first PR.", "Arguing with review feedback."],
    docs: [{ label: "Open Source Guide: how to contribute", url: "https://opensource.guide/how-to-contribute/" }],
  },
  {
    key: "proposal",
    stage: 8,
    title: "Select a project and develop a proposal",
    summary: "Discuss the idea with the community, then write an original, detailed proposal.",
    prerequisites: ["Stages 1–7 complete, with merged PRs."],
    lessons: [
      { title: "Discuss before writing", detail: "Float the idea on the org's channel and issue tracker first." },
      { title: "Draft the proposal", detail: "Problem, solution, scope, timeline, risks, prior contributions." },
      { title: "Self-review", detail: "Checklist, word counts, milestones. Write it in your own words." },
    ],
    exercises: ["Post a project discussion and incorporate feedback.", "Complete one full proposal draft."],
    estimate: "Estimate: 3–4 weeks.",
    completion: ["A complete draft covering every required section.", "Feedback from the community incorporated."],
    mistakes: ["Copying a proposal template without technical detail.", "Proposing work in a repo you never built."],
    docs: [{ label: "GSoC: writing a proposal", url: "https://developers.google.com/open-source/gsoc/resources/guide#prepare_a_proposal" }],
  },
  {
    key: "apply",
    stage: 9,
    title: "Review requirements and submit",
    summary: "Check every application requirement and deadline, then submit on the official site.",
    prerequisites: ["Stage 8 draft complete."],
    lessons: [
      { title: "Check requirements", detail: "Eligibility, page limits, template, and AI policy of your org." },
      { title: "Check deadlines", detail: "Dates move yearly. Confirm on the official timeline." },
      { title: "Submit officially", detail: "Submission happens on the GSoC site, not by email." },
    ],
    exercises: ["Run the full application checklist twice.", "Submit at least 48 hours before the deadline."],
    estimate: "Estimate: 1 week.",
    completion: ["Proposal submitted on the official site.", "Confirmation saved."],
    mistakes: ["Submitting in the last hour.", "Missing the org's own template or AI policy."],
    docs: [{ label: "GSoC timeline", url: "https://developers.google.com/open-source/gsoc/timeline" }],
  },
  {
    key: "bonding",
    stage: 10,
    title: "Prepare for acceptance: bonding and milestones",
    summary: "Community bonding, mentor collaboration, milestones, and evaluations.",
    prerequisites: ["Application submitted."],
    lessons: [
      { title: "Community bonding", detail: "Refine scope and milestones with your mentor." },
      { title: "Milestones and evaluations", detail: "Understand midterm and final evaluations before coding starts." },
      { title: "Working in public", detail: "Commits, updates, and asking for help early." },
    ],
    exercises: ["Draft a bonding-period plan with weekly milestones.", "Set up a public log for your project."],
    estimate: "Estimate: bonding period, a few weeks.",
    completion: ["You can explain the evaluation criteria.", "You have a milestone plan."],
    mistakes: ["Disappearing until coding starts.", "Hiding blockers from your mentor."],
    docs: [{ label: "GSoC contributor guide", url: "https://developers.google.com/open-source/gsoc/resources/guide" }],
  },
];

/** Total checklist items across all stages. Counted, not written. */
export function totalTasks(): number {
  return STAGES.reduce(
    (n, s) => n + s.completion.length + s.exercises.length,
    0,
  );
}
