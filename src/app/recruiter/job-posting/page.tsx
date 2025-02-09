'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON!
);

export default function JobPostingPage() {
  const router = useRouter();
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
    salary: '',
    requirements: [''],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequirementChange = (index: number, value: string) => {
    setJob((prev) => {
      const newRequirements = [...prev.requirements];
      newRequirements[index] = value;
      return { ...prev, requirements: newRequirements };
    });
  };

  const addRequirement = () => {
    setJob((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ''],
    }));
  };

  const removeRequirement = (index: number) => {
    setJob((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const response = await fetch('/api/recruiter/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          ...job,
        }),
      });

      if (!response.ok) throw new Error('Failed to create job posting');

      router.push('/recruiter/dashboard');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job posting. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#89A8B2] via-[#B3C8CF] to-[#E5E1DA] py-12 px-6"
    >
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8 border border-gray-300">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Create Job Posting</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: 'Job Title', name: 'title', type: 'text', placeholder: 'Enter job title' },
            { label: 'Company', name: 'company', type: 'text', placeholder: 'Enter company name' },
            { label: 'Location', name: 'location', type: 'text', placeholder: 'Enter location' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-lg font-semibold text-gray-700">{label} *</label>
              <input
                type={type}
                name={name}
                required
                placeholder={placeholder}
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 px-3 py-2"
                value={job[name as keyof typeof job]}
                onChange={handleInputChange}
              />
            </div>
          ))}

          <div>
            <label className="block text-lg font-semibold text-gray-700">Job Type *</label>
            <select
              name="type"
              required
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 px-3 py-2"
              value={job.type}
              onChange={handleInputChange}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">Salary Range</label>
            <input
              type="text"
              name="salary"
              placeholder="e.g., $50,000 - $70,000"
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 px-3 py-2"
              value={job.salary}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">Job Description *</label>
            <textarea
              name="description"
              required
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 px-3 py-2"
              value={job.description}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Requirements</label>
            {job.requirements.map((req, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  className="flex-1 rounded-md border border-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 px-3 py-2"
                  placeholder="Add a requirement"
                />
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="px-3 py-2 border border-red-500 text-red-500 rounded-md bg-white hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRequirement}
              className="mt-2 text-sm text-indigo-600 hover:underline"
            >
              + Add Requirement
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
