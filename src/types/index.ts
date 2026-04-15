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
  color: "teal" | "yellow";
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

export interface OpenCall {
  title: string;
  code: string;
  href: string;
}

export interface SemesterCourse {
  code: string;
  name: string;
}

export interface CurrentSemester {
  label: string;
  openCalls: OpenCall[];
  courses: SemesterCourse[];
}

export interface NavChild {
  label: string;
  href: string;
}

export interface NavGroup {
  group: string;
  items: NavChild[];
}

export interface NavItem {
  label: string;
  href?: string;
  children?: (NavChild | NavGroup)[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface ResearchLineSummary {
  name: string;
  color: "teal" | "yellow";
  href: string;
  areas: { name: string; description: string }[];
}

export interface UIStrings {
  [section: string]: Record<string, string>;
}
