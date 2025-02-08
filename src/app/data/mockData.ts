import { JobPost, UserProfile } from '@/app/types';

export const jobPosts: JobPost[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences.',
    requirements: [
      'React/Next.js expertise',
      '5+ years of experience',
      'TypeScript proficiency',
      'Strong UI/UX skills'
    ],
    companyLogo: '/logos/techcorp.png',
    postedDate: '2024-03-15',
    employmentType: 'Full-time'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'Remote',
    salary: '$130,000 - $160,000',
    description: 'Join our backend team to build scalable systems that process millions of requests daily.',
    requirements: [
      'Node.js expertise',
      'AWS experience',
      'Database design',
      'API development'
    ],
    companyLogo: '/logos/dataflow.png',
    postedDate: '2024-03-14',
    employmentType: 'Full-time'
  },
  // Add more job posts as needed
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
        year: '2019'
      }
    ],
    profilePicture: '/profiles/sarah.jpg',
    bio: 'Passionate developer with experience in building scalable web applications.'
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
        year: '2021'
      }
    ],
    profilePicture: '/profiles/michael.jpg',
    bio: 'Frontend specialist focused on creating beautiful and responsive user interfaces.'
  },
  // Add more profiles as needed
];