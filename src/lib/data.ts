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
  Editais,
  Navigation,
  Stat,
  UIStrings,
} from "../types";
import { defaultLocale, locales, type Locale } from "./i18n";

const yamlFiles = import.meta.glob("../data/*.yaml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const isTranslations = (value: object): value is Record<string, string> =>
  defaultLocale in value && Object.keys(value).every((key) => (locales as readonly string[]).includes(key));

// Text fields in the YAML files are maps like { pt-br: "...", en: "...", es: "..." };
// a missing translation falls back to Portuguese.
function localize(value: unknown, locale: Locale): unknown {
  if (Array.isArray(value)) return value.map((item) => localize(item, locale));
  if (value === null || typeof value !== "object") return value;
  if (isTranslations(value)) return value[locale] ?? value[defaultLocale];
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, locale)]));
}

function load<T>(filename: string, locale: Locale): T {
  const key = `../data/${filename}`;
  const raw = yamlFiles[key];
  if (!raw) {
    throw new Error(`YAML file not found: ${key}`);
  }
  return localize(parse(raw), locale) as T;
}

// Professors
export const getProfessors = (locale: Locale) =>
  load<Professor[]>("professors.yaml", locale);

// Students
export const getStudents = (locale: Locale) =>
  load<StudentsData>("students.yaml", locale);

// Courses
export const getCourses = (locale: Locale) =>
  load<Course[]>("courses.yaml", locale);

// Research Lines
export const getResearchLines = (locale: Locale) =>
  load<ResearchLine[]>("research-lines.yaml", locale);

export const getResearchLineSummaries = (locale: Locale) =>
  load<ResearchLineSummary[]>("research-line-summaries.yaml", locale);

// Alumni
export const getAlumni = (locale: Locale) =>
  load<Alumnus[]>("alumni.yaml", locale);

// CCP
export const getCCP = (locale: Locale) =>
  load<CCPData>("ccp.yaml", locale);

// Navigation
export const getNavigation = (locale: Locale) =>
  load<Navigation>("navigation.yaml", locale);

// Menu entry for a route, with the section that lists it
export function getNavPage(route: string, locale: Locale) {
  for (const section of getNavigation(locale).main) {
    const page = section.links.find((link) => link.href === route);
    if (page) return { section, page };
  }
  return undefined;
}

// Current Semester
export const getCurrentSemester = (locale: Locale) =>
  load<CurrentSemester>("current-semester.yaml", locale);

export function getSemesterCourses(locale: Locale): Course[] {
  const catalog = getCourses(locale);
  return getCurrentSemester(locale).courses.map((code) => {
    const course = catalog.find((c) => c.code === code);
    if (!course) throw new Error(`A disciplina ${code} do semestre não está em courses.yaml.`);
    return course;
  });
}

// Editais
export const getEditais = (locale: Locale) =>
  load<Editais>("editais.yaml", locale);

// Stats
export const getStats = (locale: Locale) =>
  load<Stat[]>("stats.yaml", locale);

// UI Strings
export const getUI = (locale: Locale) =>
  load<UIStrings>("ui.yaml", locale);
