'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON!
);

interface RecruiterProfile {
  fullName: string;
  email: string;
  company: string;
  position: string;
  phone: string | null;
  linkedin: string | null;
  companyWebsite: string | null;
  bio: string | null;
}

export default function RecruiterProfile() {
  const [profile, setProfile] = useState<RecruiterProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<RecruiterProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user found');

        const response = await fetch(`/api/recruiter/profile?userId=${user.id}`);
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

      const response = await fetch('/api/recruiter/profile', {
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
                  <p className="mt-1 text-gray-900">{profile?.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{profile?.email}</p>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile?.company}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev!, company: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profile?.company}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile?.position}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev!, position: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profile?.position}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile?.phone || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev!, phone: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profile?.phone || 'Not provided'}</p>
                )}
              </div>
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
                  <a href={profile?.linkedin || '#'} className="mt-1 text-blue-600 hover:underline">
                    {profile?.linkedin || 'Not provided'}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Company Website */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Company Website</h3>
            {isEditing ? (
              <input
                type="url"
                value={editedProfile?.companyWebsite || ''}
                onChange={(e) => setEditedProfile(prev => ({ ...prev!, companyWebsite: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            ) : (
              <a href={profile?.companyWebsite || '#'} className="mt-1 text-blue-600 hover:underline">
                {profile?.companyWebsite || 'Not provided'}
              </a>
            )}
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Bio</h3>
            {isEditing ? (
              <textarea
                value={editedProfile?.bio || ''}
                onChange={(e) => setEditedProfile(prev => ({ ...prev!, bio: e.target.value }))}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            ) : (
              <p className="mt-1 text-gray-900 whitespace-pre-line">
                {profile?.bio || 'No bio provided'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 