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
  skills: SkillGroup[];
  activities?: Experience[]; // Reusing experience structure for generic activities
}

export enum TemplateType {
  CLASSIC = 'classic',
  MODERN = 'modern'
}