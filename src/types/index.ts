export interface Professor {
  name: string;
  researchAreas: string;
  advisingLevel: string;
  lattesUrl: string;
  email: string;
  website?: string;
  researchLines: string[];
}

export interface Student {
  name: string;
  advisor: string;
  entrySemester: string;
  lattesUrl: string;
  email: string;
}

export interface StudentsData {
  doctorate: Student[];
  masters: Student[];
}

export interface Course {
  code: string;
  name: string;
  credits: number;
  weeklyHours: string;
  type: "required" | "elective";
  researchLine?: string;
}

export interface ResearchArea {
  name: string;
  description: string;
}

export interface ResearchLine {
  id: string;
  name: string;
  slug: string;
  description: string;
  objective: string;
  areas: ResearchArea[];
  advisors: string[];
}

export interface CCPMember {
  holder: string;
  role: string;
  term: string;
  alternate: string;
  alternateTerm: string;
}

export interface PastCoordinator {
  name: string;
  term: string;
}

export interface CCPMeeting {
  date: string;
  day: string;
  time: string;
}

export interface CCPData {
  members: CCPMember[];
  pastCoordinators: PastCoordinator[];
  meetings: {
    label: string;
    items: CCPMeeting[];
  }[];
}

export interface Alumnus {
  number: number;
  name: string;
  advisor: string;
  defenseYear: number;
  lattesUrl: string;
  email: string;
}

export interface CurrentSemester {
  label: string;
  courses: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface DatedLink extends NavLink {
  date?: string;
}

export interface NavPage extends NavLink {
  description: string;
}

export interface NavSection {
  id: string;
  label: string;
  href: string;
  intro: string;
  /** Topo escuro com ilustração, comum a todas as abas da seção; sem ela, o topo é claro. */
  image?: { src: string; alt: string };
  action?: NavLink;
  links: NavPage[];
}

export interface FooterColumn {
  label: string;
  links: NavLink[];
}

export interface Navigation {
  main: NavSection[];
  footer: FooterColumn[];
}

export interface Call {
  title: string;
  edital: NavLink;
  /** Complemento depois do número do edital, como "seleção em duas fases". */
  note: string;
  status: string;
  apply: string;
  /** Linha do edital na faixa de ingresso do Início. */
  home: { title: string; text: string; badge?: string };
  schedule: { date: string; event: string }[];
  documents: NavLink[];
}

export interface PastProcess {
  title: string;
  edital: { label: string; href?: string };
  links: DatedLink[];
}

export interface Editais {
  open: Call[];
  results: { year: number; processes: PastProcess[] }[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface ResearchLineSummary {
  name: string;
  description: string;
  href: string;
  areas: { name: string; description: string }[];
}

type Strings<K extends string> = Record<K, string>;

export interface UIStrings {
  site: Strings<"title" | "description" | "watermark">;
  masthead: Strings<"menu" | "nav" | "open" | "logo" | "usp" | "language">;
  footer: Strings<"programName" | "institution" | "university" | "address" | "zip" | "copyright" | "domain">;
  page: Strings<"home" | "crumbs" | "toc" | "documents" | "untranslated">;
  call: Strings<"edital" | "apply" | "read" | "schedule" | "documents">;
  cta: Strings<"title" | "text">;
  home: Strings<
    | "title" | "deck" | "intro" | "imageAlt" | "apply" | "research" | "doctorateTitle" | "doctorateText" | "doctorateLink"
    | "admission" | "numbers" | "news" | "allNews" | "linesTitle" | "linesText" | "linesButton" | "advisorsTitle"
    | "advisorsText" | "advisorsOpen" | "advisorsClose" | "coursesTitle" | "coursesText" | "coursesButton" | "ctaButton"
  >;
  editais: Strings<
    | "title" | "sub" | "ongoing" | "processTitle" | "processText" | "doctorate"
    | "other" | "international" | "special" | "results" | "older" | "olderMasters" | "olderDoctorate" | "ctaButton"
  > & { steps: { title: string; text: string }[] };
  people: Strings<
    | "advisorsTitle" | "advisorsText" | "site" | "studentsTitle" | "studentsText" | "doctorate" | "doctorateCount" | "masters"
    | "mastersCount" | "lists" | "listsText" | "alumniTitle" | "alumniText" | "alumniLibrary" | "library" | "alumniCount"
    | "ccpTitle" | "ccpText" | "composition" | "pastCoordinators" | "meetings" | "meetingsText" | "important" | "importantText"
  >;
  table: Strings<
    | "name" | "advisor" | "entry" | "email" | "number" | "holder" | "role" | "term" | "alternate" | "period" | "date" | "day"
    | "time" | "code" | "course" | "credits" | "hours"
  >;
  courses: Strings<"title" | "sub" | "required" | "electives" | "lineElectives">;
  research: Strings<"objective" | "areas" | "advisors">;
  news: Strings<"title" | "sub" | "more">;
  posts: Strings<"title" | "sub" | "by" | "more" | "topics" | "authorTitle" | "authorSub" | "tagTitle" | "tagSub">;
}
