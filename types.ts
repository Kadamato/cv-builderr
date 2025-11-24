export interface Education {
  id: string;
  school: string;
  degree: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  description: string; // Will treat newlines as bullet points
}

export interface Project {
  id: string;
  name: string;
  technologies: string;
  link?: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  link?: string;
  date?: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    cityStateZip?: string; // For classic template
    linkedin?: string;
    website?: string;
    summary?: string;
    jobTitle?: string; // For modern template
    photoUrl?: string; // For modern template
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications?: Certification[]; // Added certifications
  skills: SkillGroup[];
  activities?: Experience[]; // Reusing experience structure for generic activities
}

export enum TemplateType {
  CLASSIC = 'classic',
  MODERN = 'modern'
}