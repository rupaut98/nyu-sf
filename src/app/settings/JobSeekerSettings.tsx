'use client';
import { useState } from 'react';

export default function JobSeekerSettings() {
  const [settings, setSettings] = useState({
    roles: ['Software Engineer', 'Frontend Developer'],
    locations: ['San Francisco', 'Remote'],
    minSalary: 100000,
    workType: ['Full-time', 'Contract'],
    visaSponsorship: true,
    remotePreference: 'Hybrid',
    experience: '3-5 years'
  });

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Job Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Preferred Roles</label>
            <input
              type="text"
              placeholder="Add roles (e.g., Software Engineer)"
              className="w-full p-2 border rounded"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {settings.roles.map((role, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Preferred Locations</label>
            <input
              type="text"
              placeholder="Add locations"
              className="w-full p-2 border rounded"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {settings.locations.map((location, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {location}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Minimum Salary</label>
            <input
              type="number"
              value={settings.minSalary}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Work Type</label>
            <select className="w-full p-2 border rounded">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Remote Preference</label>
            <select className="w-full p-2 border rounded">
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.visaSponsorship}
                className="rounded"
              />
              <span>Require Visa Sponsorship</span>
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