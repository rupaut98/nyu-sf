'use client';
import { useState } from 'react';
import FeedNavbar from '@/component/FeedNavbar';
import JobSeekerSettings from './JobSeekerSettings';
import RecruiterSettings from './RecruiterSettings';

type UserType = 'jobseeker' | 'recruiter';

export default function SettingsPage() {
  // In a real app, you'd get this from auth context/state
  const [userType] = useState<UserType>('jobseeker');

  return (
    <div className="min-h-screen bg-gray-50">
      <FeedNavbar />
      <div className="max-w-3xl mx-auto pt-20 px-4 pb-16">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        {userType === 'jobseeker' ? <JobSeekerSettings /> : <RecruiterSettings />}
      </div>
    </div>
  );
} 