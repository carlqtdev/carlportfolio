/**
 * Everything personal lives here. Edit this file to make the site yours — no
 * component changes required.
 *
 * Deliberately no phone number: this content is published on a public website.
 */

export type EducationItem = {
  credential: string;
  institution: string;
  period: string;
  detail?: string;
};

export const profile = {
  name: "Carl Peñaranda",
  role: "Web Developer",
  location: "Glan, Sarangani Province",
  /** Shown in the hero and as the about section standfirst. */
  available: "Open to web developer opportunities",
  /** Shown as the h1 in the hero. Keep to one or two sentences. */
  tagline:
    "I build and design responsive websites — from the first visual idea through to something that works properly in a browser.",
  bio: [
    "I'm a web developer based in Glan, Sarangani Province, currently finishing a Diploma in Information Technology at Andres Soriano College.",
    "My background covers both sides of a website: web development on one side, web and graphic design on the other. That means I can take a design from a layout concept to a working, responsive page without handing it off halfway through. I'm looking for a role where I can build real projects and keep learning.",
  ],
  /**
   * Served from /public/resume.pdf. Replace that file with your own export;
   * nothing else needs to change.
   */
  resumeHref: "/resume.pdf",
  email: "carlpenaranda7@gmail.com",
};

export const skills: string[] = [
  "Web Development",
  "Web Design",
  "Graphic Design",
  "Problem Solving",
  "Computer Literacy",
];

export const education: EducationItem[] = [
  {
    credential: "Diploma in Information Technology",
    institution: "Andres Soriano College",
    period: "2023 — 2026",
  },
  {
    credential: "Secondary School",
    institution: "Glan School of Arts and Trade",
    period: "2022 — 2023",
  },
];
