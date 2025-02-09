'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON!
);

// Hardcoded resume data
const RESUME_DATA = {
  fullName: "RUPAK RAUT",
  email: "rupakraut78@gmail.com",
  linkedin: "https://www.linkedin.com/in/rupak-raut",
  portfolio: "https://rupaut98.github.io",
  education: {
    university: "The University of Southern Mississippi",
    major: "Computer Science & Mathematics",
    graduation: "May 2026",
    gpa: "4.0"
  },
  experience: [
    {
      title: "Machine Learning Engineer Intern",
      company: "OmniSynkAI",
      period: "June 2024 - Dec 2024",
      highlights: [
        "Led the fine-tuning of a BERT-based LLM model, trained on 100,000+ product entries",
        "Applied NLP techniques, including tokenization, TF-IDF vectorization",
        "Reduced backend response time by 30% with Redis caching"
      ]
    },
    {
      title: "Software Engineer Intern",
      company: "OmniSynkAI",
      period: "Jan 2024 - May 2024",
      highlights: [
        "Developed responsive, dynamic UIs with Next.js, Tailwind CSS, and Redux",
        "Automated listings, order fulfillment, and inventory synchronization",
        "Hosted Fastify/Node.js and PostgreSQL backend with Prisma ORM"
      ]
    }
  ],
  skills: [
    "Python", "Javascript", "C++", "React", "Node.js", "Next.js", "AWS", "ELB",
    "Azure", "Terraform", "MySQL", "MongoDB", "Redis", "REST", "GraphQL", "Git",
    "GitHub Actions", "CI/CD", "GCP", "NLP", "Docker", "Kubernetes", "Angular", "LLM"
  ]
};

export default function JobSeekerProfileSetup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    education: {
      university: '',
      major: '',
      graduation: '',
      gpa: ''
    },
    experience: [{
      title: '',
      company: '',
      period: '',
      description: ''
    }],
    skills: [''],
    bio: ''
  });

  const simulateAutoFill = async () => {
    setIsLoading(true);
    setLoadingText('Analyzing resume...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoadingText('Extracting information...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoadingText('Auto-filling fields...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProfile({
      fullName: RESUME_DATA.fullName,
      email: RESUME_DATA.email,
      phone: '',
      linkedin: RESUME_DATA.linkedin,
      portfolio: RESUME_DATA.portfolio,
      education: RESUME_DATA.education,
      experience: RESUME_DATA.experience.map(exp => ({
        ...exp,
        description: exp.highlights.join('\n')
      })),
      skills: RESUME_DATA.skills,
      bio: ''
    });
    
    setIsLoading(false);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await simulateAutoFill();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const response = await fetch('/api/jobseeker/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          ...profile,
        }),
      });

      if (!response.ok) throw new Error('Failed to create profile');
      
      router.push('/feed/jobseeker');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-lg font-medium">{loadingText}</p>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Profile</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-black file:text-white
                hover:file:bg-gray-800"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  required
                />
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                <input
                  type="url"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Portfolio</label>
                <input
                  type="url"
                  value={profile.portfolio}
                  onChange={(e) => setProfile({...profile, portfolio: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Education</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">University</label>
                  <input
                    type="text"
                    value={profile.education.university}
                    onChange={(e) => setProfile({
                      ...profile,
                      education: {...profile.education, university: e.target.value}
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Major</label>
                  <input
                    type="text"
                    value={profile.education.major}
                    onChange={(e) => setProfile({
                      ...profile,
                      education: {...profile.education, major: e.target.value}
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Experience</h3>
              {profile.experience.map((exp, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-md">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => {
                          const newExp = [...profile.experience];
                          newExp[index].title = e.target.value;
                          setProfile({...profile, experience: newExp});
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...profile.experience];
                          newExp[index].company = e.target.value;
                          setProfile({...profile, experience: newExp});
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => {
                        const newExp = [...profile.experience];
                        newExp[index].description = e.target.value;
                        setProfile({...profile, experience: newExp});
                      }}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setProfile({
                  ...profile,
                  experience: [...profile.experience, { title: '', company: '', period: '', description: '' }]
                })}
                className="text-sm text-black underline"
              >
                + Add Experience
              </button>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-5">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
              >
                Complete Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 