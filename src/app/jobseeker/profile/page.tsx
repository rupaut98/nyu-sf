'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON!
);

interface Profile {
  fullName: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  portfolio: string | null;
  bio: string | null;
  education: {
    university: string;
    major: string;
    graduation: string;
    gpa: string;
  };
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  skills: string[];
}

export default function JobSeekerProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user found');

        const response = await fetch(`/api/jobseeker/profile?userId=${user.id}`);
        const { data } = await response.json();
        setProfile(data);
        setEditedProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    if (!editedProfile) return;

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
          ...editedProfile,
        }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile changes');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Edit Profile
            </button>
          ) : (
            <div className="space-x-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedProfile(profile);
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile?.fullName}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev!, fullName: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profile.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{profile.email}</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Links</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editedProfile?.linkedin || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev!, linkedin: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                ) : (
                  <a href={profile.linkedin || '#'} className="mt-1 text-blue-600 hover:underline">
                    {profile.linkedin || 'Not provided'}
                  </a>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Portfolio</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editedProfile?.portfolio || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev!, portfolio: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                ) : (
                  <a href={profile.portfolio || '#'} className="mt-1 text-blue-600 hover:underline">
                    {profile.portfolio || 'Not provided'}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">University</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile?.education.university}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev!,
                      education: { ...prev!.education, university: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profile.education.university}</p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Major</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.education.major}
                      onChange={(e) => setEditedProfile(prev => ({
                        ...prev!,
                        education: { ...prev!.education, major: e.target.value }
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.education.major}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">GPA</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.education.gpa}
                      onChange={(e) => setEditedProfile(prev => ({
                        ...prev!,
                        education: { ...prev!.education, gpa: e.target.value }
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.education.gpa}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm text-black"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Experience</h3>
            <div className="space-y-6">
              {profile.experience.map((exp, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{exp.title}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.period}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 