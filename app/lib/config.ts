/** Site-wide constants. Update these when the real URLs exist. */

export const MAIN_SITE_URL = "https://pcu.edu.ng";

/** Short Courses portal - sibling site that shares this design system. */
export const SHORT_COURSES_URL = "https://pcu.edu.ng/short-courses";

export const CONTACT = {
  unit: "Academic Records Unit",
  phone: "+234 813 808 2466",
  email: "examsandrecords@pcu.edu.ng",
  /** Digits only, international format, for wa.me links. */
  whatsapp: "2348138082466",
  address: "Precious Cornerstone University, Ibadan, Oyo State, Nigeria",
};

export const SITE_NAME = "PCU Certificate Verification";

/**
 * The graduation year on/after which certificates carry a unique
 * certificate number. Graduates before this year are verified with their
 * name + department + matric number.
 */
export const CERTIFICATE_NUMBER_FROM_YEAR = 2026;

/** First graduating cohort the registry can verify online. */
export const EARLIEST_GRADUATION_YEAR = 2017;

/** Departments offered - used to populate the legacy verification form. */
export const DEPARTMENTS = [
  "Computer Science",
  "Business Administration",
  "Economics",
  "International Relations",
  "Mass Communication",
  "Physical Sciences",
  "Natural Sciences",
] as const;
