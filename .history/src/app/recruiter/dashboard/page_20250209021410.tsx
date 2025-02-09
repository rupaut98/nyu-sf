'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON!
);

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary: string | null;
  requirements: string[];
  createdAt: string;
}

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user found');

        const response = await fetch(`/api/recruiter/jobs/${user.id}`);
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Job Postings</h1>
          <Link
            href="/recruiter/job-posting"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Post New Job
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No jobs posted yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span>{job.location}</span>
                  <span className="mx-2">•</span>
                  <span>{job.type}</span>
                </div>
                {job.salary && (
                  <p className="text-gray-600 text-sm mb-4">{job.salary}</p>
                )}
                <div className="flex justify-between items-center mt-4">
                  <Link
                    href={`/recruiter/matches/${job.id}`}
                    className="text-black hover:underline"
                  >
                    View Matches
                  </Link>
                  <span className="text-gray-400 text-sm">
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 