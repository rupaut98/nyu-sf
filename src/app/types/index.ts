export interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  companyLogo?: string;
  postedDate: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
}

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: number;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  profilePicture?: string;
  bio: string;
} 