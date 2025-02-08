'use client';
import { useState } from 'react';

export default function RecruiterSettings() {
  const [settings, setSettings] = useState({
    requiredSkills: ['React', 'TypeScript', 'Node.js'],
    experienceLevel: '3-5 years',
    educationLevel: "Bachelor's Degree",
    visaSponsorship: false,
    workplaceType: 'Hybrid',
    locations: ['San Francisco'],
    salaryRange: {
      min: 100000,
      max: 150000
    }
  });

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Job Requirements</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Required Skills</label>
            <input
              type="text"
              placeholder="Add required skills"
              className="w-full p-2 border rounded"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {settings.requiredSkills.map((skill, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Experience Level</label>
            <select className="w-full p-2 border rounded">
              <option>Entry Level</option>
              <option>1-3 years</option>
              <option>3-5 years</option>
              <option>5+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Education Level</label>
            <select className="w-full p-2 border rounded">
              <option>High School</option>
              <option>Bachelor's Degree</option>
              <option>Master's Degree</option>
              <option>PhD</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Workplace Type</label>
            <select className="w-full p-2 border rounded">
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Salary Range</label>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Min"
                value={settings.salaryRange.min}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Max"
                value={settings.salaryRange.max}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.visaSponsorship}
                className="rounded"
              />
              <span>Offer Visa Sponsorship</span>
            </label>
          </div>
        </div>
      </section>

      <button className="w-full bg-black text-white py-3 rounded-lg">
        Save Settings
      </button>
    </div>
  );
} 