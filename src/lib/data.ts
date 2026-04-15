import { parse } from "yaml";
import type {
  Professor,
  StudentsData,
  Course,
  ResearchLine,
  ResearchLineSummary,
  Alumnus,
  CCPData,
  CurrentSemester,
  NavItem,
  Stat,
  UIStrings,
} from "../types";

const DEFAULT_LOCALE = "pt-br";

// Use Vite's import.meta.glob to load all YAML files at build time
// This enables future i18n: just add files to src/data/{locale}/
const yamlFiles = import.meta.glob("../data/**/*.yaml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function load<T>(filename: string, locale: string = DEFAULT_LOCALE): T {
  const key = `../data/${locale}/${filename}`;
  const raw = yamlFiles[key];
  if (!raw) {
    throw new Error(`YAML file not found: ${key}`);
  }
  return parse(raw) as T;
}

// Professors
export const getProfessors = (locale?: string) =>
  load<Professor[]>("professors.yaml", locale);

export const getProfessorsByLine = (lineId: string, locale?: string) =>
  getProfessors(locale).filter((p) => p.researchLines.includes(lineId));

// Students
export const getStudents = (locale?: string) =>
  load<StudentsData>("students.yaml", locale);

// Courses
export const getCourses = (locale?: string) =>
  load<Course[]>("courses.yaml", locale);

export const getRequiredCourses = (locale?: string) =>
  getCourses(locale).filter((c) => c.type === "required");

export const getElectiveCourses = (locale?: string) =>
  getCourses(locale).filter((c) => c.type === "elective");

export const getCoursesByLine = (lineId: string, locale?: string) =>
  getCourses(locale).filter(
    (c) => c.researchLine === lineId || c.researchLine === "both"
  );

// Research Lines
export const getResearchLines = (locale?: string) =>
  load<ResearchLine[]>("research-lines.yaml", locale);

export const getResearchLineBySlug = (slug: string, locale?: string) =>
  getResearchLines(locale).find((l) => l.slug === slug);

export const getResearchLineSummaries = (locale?: string) =>
  load<ResearchLineSummary[]>("research-line-summaries.yaml", locale);

// Alumni
export const getAlumni = (locale?: string) =>
  load<Alumnus[]>("alumni.yaml", locale);

// CCP
export const getCCP = (locale?: string) =>
  load<CCPData>("ccp.yaml", locale);

// Navigation
export const getNavigation = (locale?: string) =>
  load<NavItem[]>("navigation.yaml", locale);

// Current Semester
export const getCurrentSemester = (locale?: string) =>
  load<CurrentSemester>("current-semester.yaml", locale);

// Stats
export const getStats = (locale?: string) =>
  load<Stat[]>("stats.yaml", locale);

// UI Strings
export const getUI = (locale?: string) =>
  load<UIStrings>("ui.yaml", locale);

// Available locales (derived from directory structure)
export function getAvailableLocales(): string[] {
  const locales = new Set<string>();
  for (const key of Object.keys(yamlFiles)) {
    const match = key.match(/\.\.\/data\/([^/]+)\//);
    if (match) locales.add(match[1]);
  }
  return [...locales];
}
