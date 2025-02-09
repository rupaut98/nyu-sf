'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON!
);

export default function RecruiterProfileSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    fullName: '',
    company: '',
    title: '',
    email: '',
    phone: '',
    bio: '',
    linkedIn: '',
    hideEmail: false,
    hidePhone: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProfile(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('recruiter_profiles')
        .insert([
          {
            user_id: user.id,
            full_name: profile.fullName,
            company: profile.company,
            title: profile.title,
            email: profile.hideEmail ? null : profile.email,
            phone: profile.hidePhone ? null : profile.phone,
            bio: profile.bio,
            linkedin_url: profile.linkedIn,
            privacy_settings: {
              hide_email: profile.hideEmail,
              hide_phone: profile.hidePhone,
            }
          }
        ]);

      if (error) throw error;
      
      router.push('/recruiter/job-posting');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Recruiter Profile</h2>
          <p className="text-gray-600">Step {step} of 2</p>
        </div>

        {step === 1 ? (
          // Step 1: Basic Information
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                value={profile.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company *</label>
              <input
                type="text"
                name="company"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                value={profile.company}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                type="text"
                name="title"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                value={profile.title}
                onChange={handleInputChange}
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
            >
              Next
            </button>
          </div>
        ) : (
          // Step 2: Contact Information and Privacy
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 flex items-center space-x-3">
                <input
                  type="email"
                  name="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  value={profile.email}
                  onChange={handleInputChange}
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="hideEmail"
                    checked={profile.hideEmail}
                    onChange={handleCheckboxChange}
                  />
                  <span className="text-sm text-gray-600">Hide</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="mt-1 flex items-center space-x-3">
                <input
                  type="tel"
                  name="phone"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  value={profile.phone}
                  onChange={handleInputChange}
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="hidePhone"
                    checked={profile.hidePhone}
                    onChange={handleCheckboxChange}
                  />
                  <span className="text-sm text-gray-600">Hide</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
              <input
                type="url"
                name="linkedIn"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                value={profile.linkedIn}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                value={profile.bio}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="w-1/2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="w-1/2 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
              >
                Complete Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 