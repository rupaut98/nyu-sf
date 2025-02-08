'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Camera, Plus, LogOut } from 'lucide-react';
import FeedNavbar from '@/component/FeedNavbar';

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Software Engineer',
    gender: 'Male',
    location: 'San Francisco, CA',
    bio: 'Passionate developer with 5+ years of experience',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    experiences: [
      {
        id: '1',
        title: 'Senior Developer',
        company: 'Tech Corp',
        startDate: '2020-01',
        endDate: 'Present',
        description: 'Leading frontend development team'
      }
    ] as Experience[],
    projects: [
      {
        id: '1',
        title: 'Portfolio Website',
        description: 'Personal portfolio built with Next.js',
        link: 'https://portfolio.com'
      }
    ] as Project[],
    education: [
      {
        degree: 'BS Computer Science',
        school: 'University of Technology',
        year: '2019'
      }
    ]
  });

  const handleLogout = () => {
    // Add logout logic here
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FeedNavbar />
      <div className="max-w-3xl mx-auto pt-20 px-4 pb-16">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Image
                src="/default-avatar.png"
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full"
              />
              <button className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <p className="text-gray-600">{profile.title}</p>
                  <p className="text-gray-500">{profile.location}</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-black text-white px-4 py-2 rounded-full"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <input
                type="text"
                value={profile.gender}
                disabled={!isEditing}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled={!isEditing}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                disabled={!isEditing}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Skills</h2>
            {isEditing && (
              <button className="text-black">
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
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
        </section>

        {/* Experience */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Experience</h2>
            {isEditing && (
              <button className="text-black">
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
          {profile.experiences.map((exp) => (
            <div key={exp.id} className="mb-4 border-b pb-4">
              <h3 className="font-bold">{exp.title}</h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-gray-500">
                {exp.startDate} - {exp.endDate}
              </p>
              <p className="mt-2">{exp.description}</p>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Projects</h2>
            {isEditing && (
              <button className="text-black">
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
          {profile.projects.map((project) => (
            <div key={project.id} className="mb-4 border-b pb-4">
              <h3 className="font-bold">{project.title}</h3>
              <p className="mt-2">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Project
              </a>
            </div>
          ))}
        </section>

        {/* Resume Upload */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Resume</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              id="resume"
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
            <label
              htmlFor="resume"
              className="cursor-pointer text-gray-600 hover:text-black"
            >
              <p>Drop your resume here or click to upload</p>
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: PDF, DOC, DOCX
              </p>
            </label>
          </div>
        </section>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
} 