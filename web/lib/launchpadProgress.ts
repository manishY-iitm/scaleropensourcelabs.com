// Client-side progress store for the Launchpad (Stage 1).
// Local-only: lessons/tasks marked complete, saved orgs, streaks derived from
// real local activity timestamps. No server, no fake activity, exportable JSON.

export const STORAGE_KEY = "gsoc-launchpad-progress-v1";

export type LaunchpadProgress = {
  checked: Record<string, boolean>;
  savedOrgs: string[];
  activityDays: string[];
  updatedAt: string;
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function emptyProgress(): LaunchpadProgress {
  return { checked: {}, savedOrgs: [], activityDays: [], updatedAt: today() };
}

export function loadProgress(): LaunchpadProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as LaunchpadProgress;
    if (!parsed || typeof parsed !== "object" || !parsed.checked) return emptyProgress();
    return {
      checked: parsed.checked,
      savedOrgs: Array.isArray(parsed.savedOrgs) ? parsed.savedOrgs : [],
      activityDays: Array.isArray(parsed.activityDays) ? parsed.activityDays : [],
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : today(),
    };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(p: LaunchpadProgress): void {
  if (typeof window === "undefined") return;
  const stamped: LaunchpadProgress = {
    ...p,
    updatedAt: today(),
    activityDays: p.activityDays.includes(today())
      ? p.activityDays
      : [...p.activityDays, today()].slice(-365),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stamped));
}

export function exportProgress(p: LaunchpadProgress): string {
  return JSON.stringify({ exportedAt: new Date().toISOString(), ...p }, null, 2);
}
