import { JobPost, UserProfile } from '@/src/app/types';

export const jobPosts: JobPost[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Google',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    description:
      'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences.',
    requirements: [
      'React/Next.js expertise',
      '5+ years of experience',
      'TypeScript proficiency',
      'Strong UI/UX skills',
    ],
    companyLogo: '/google.gif', // Ensure this image exists in public/logos/
    postedDate: '2024-03-15',
    employmentType: 'Full-time',
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'Netflix',
    location: 'Remote',
    salary: '$130,000 - $160,000',
    description:
      'Join our backend team to build scalable systems that process millions of requests daily.',
    requirements: [
      'Node.js expertise',
      'AWS experience',
      'Database design',
      'API development',
    ],
    companyLogo: '/netflix.gif', // Ensure this image exists in public/logos/
    postedDate: '2024-03-14',
    employmentType: 'Full-time',
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Amazon',
    location: 'Austin, TX',
    salary: '$80,000 - $100,000',
    description:
      'We are seeking a talented UX/UI Designer to create intuitive and engaging digital experiences.',
    requirements: [
      'Proven design portfolio',
      'Proficiency in design tools (Figma, Sketch)',
      'Understanding of user-centered design principles',
    ],
    companyLogo: '/amazon.gif', // Ensure this image exists in public/logos/
    postedDate: '2024-03-12',
    employmentType: 'Contract',
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Mongo',
    location: 'Boston, MA',
    salary: '$110,000 - $140,000',
    description:
      'Seeking an experienced DevOps Engineer to streamline our cloud infrastructure and CI/CD pipelines.',
    requirements: [
      'Experience with Kubernetes and Docker',
      'Familiarity with AWS or Azure',
      'Strong scripting skills',
    ],
    companyLogo: '/mongo.gif', // Ensure this image exists in public/logos/
    postedDate: '2024-03-10',
    employmentType: 'Full-time',
  },
  {
    id: '5',
    title: 'Full Stack Developer',
    company: 'Capital One',
    location: 'New York, NY',
    salary: '$100,000 - $130,000',
    description:
      'Looking for a versatile Full Stack Developer to work on cutting-edge web applications.',
    requirements: [
      'Experience with MERN stack',
      'Knowledge of modern frontend frameworks',
      'Ability to work in an agile environment',
    ],
    companyLogo: '/capitalone.gif', // Ensure this image exists in public/logos/
    postedDate: '2024-03-08',
    employmentType: 'Part-time',
  },
];

export const userProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Full Stack Developer',
    location: 'New York, NY',
    experience: 5,
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    education: [
      {
        degree: 'BS Computer Science',
        institution: 'MIT',
        year: '2019',
      },
    ],
    profilePicture: '/profiles/sarah.jpg', // Ensure this image exists in public/profiles/
    bio: 'Passionate developer with experience in building scalable web applications.',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Frontend Engineer',
    location: 'Seattle, WA',
    experience: 3,
    skills: ['React', 'Vue.js', 'JavaScript', 'CSS', 'UI/UX'],
    education: [
      {
        degree: 'MS Software Engineering',
        institution: 'Stanford University',
        year: '2021',
      },
    ],
    profilePicture: '/profiles/michael.jpg', // Ensure this image exists in public/profiles/
    bio: 'Frontend specialist focused on creating beautiful and responsive user interfaces.',
  },
];

export interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  companyLogo: string;
  postedDate: string;
  employmentType: string;
  department?: string;
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
  profilePicture: string;
  bio: string;
}