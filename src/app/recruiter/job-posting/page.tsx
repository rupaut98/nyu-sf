'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON!
);

export default function JobPostingPage() {
  // Define the initial job data based on the provided resume.
  const initialJobData = {
    title: 'Machine Learning Engineer',
    company: 'InnovateAI Solutions',
    location: 'Remote', // You can update as needed.
    type: 'Full-time',
    description: `InnovateAI Solutions is a fast-growing startup focused on AI for e-commerce.

Core Responsibilities:
- Develop and deploy machine learning models (especially NLP).
- Fine-tune LLMs.
- Work with large datasets.
- Use cloud platforms (AWS, Azure, GCP).
- Collaborate with a team.`,
    salary: '',
    requirements: [
      'Python programming',
      'Experience with ML frameworks (TensorFlow, PyTorch, scikit-learn)',
      'NLP experience',
      'Cloud experience (AWS, Azure, GCP)',
      'Version control (Git)',
      'RESTful APIs',
      'LLM fine-tuning experience (bonus)',
      'Docker/Kubernetes (bonus)',
      'React/Next.js experience (bonus)',
      'Open-source contributions (bonus)',
    ],
  };

  // Initialize form state with the resume data.
  const [job, setJob] = useState(initialJobData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

      router.push('/recruiter/dashboard');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job posting. Please try again.');
    }
  };

  // Handle PDF upload to autofill data
  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show processing overlay for 2-3 seconds
    setLoading(true);
    setTimeout(() => {
      // Simulate autofill from the PDF (using the hardcoded resume data)
      setJob(initialJobData);
      setLoading(false);
      // Reset the file input so it can be used again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 2500);
  };

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p className="text-lg font-medium">Processing PDF...</p>
          </div>
        </div>
      )}

      <div
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#89A8B2] via-[#B3C8CF] to-[#E5E1DA] py-12 px-6"
      >
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8 border border-gray-300">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Create Job Posting</h2>

          {/* Autofill Button for PDF Upload */}
          <div className="flex justify-center mb-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Autofill from PDF
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePDFUpload}
              accept="application/pdf"
              style={{ display: 'none' }}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: 'Job Title', name: 'title', type: 'text', placeholder: 'Enter job title' },
              { label: 'Company', name: 'company', type: 'text', placeholder: 'Enter company name' },
              { label: 'Location', name: 'location', type: 'text', placeholder: 'Enter location' },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>

                <label className="block text-lg text-black font-semibold text-gray-700">{label} *</label>

                <input
                  type={type}
                  name={name}
                  required
                  placeholder={placeholder}

                  className="mt-1 block w-full text-black rounded-md border border-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 px-3 py-2"

                  value={job[name as keyof typeof job] as string}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <div>
              <label className="block text-lg font-semibold text-gray-700">Job Type *</label>
              <select
                name="type"
                required

                className="mt-1 block w-full text-blackrounded-md border border-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 px-3 py-2"

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

                className="mt-1 block w-full text-black rounded-md border border-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 px-3 py-2"

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

                className="mt-1 block w-full text-black rounded-md border border-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 px-3 py-2"

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
                    className="flex-1 rounded-md text-black border border-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 px-3 py-2"

                    placeholder="Add a requirement"
                  />
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="px-3 py-2 border text-black border-red-500 text-red-500 rounded-md bg-white hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"

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

                className="bg-indigo-600 text-black text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
