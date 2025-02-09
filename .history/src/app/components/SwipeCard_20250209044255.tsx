import Image from 'next/image';
import { JobPost, UserProfile } from '@src/app/types';

interface SwipeCardProps {
  data: JobPost | UserProfile;
  type: 'job' | 'profile';
}

export default function SwipeCard({ data, type }: SwipeCardProps) {
  const isJob = type === 'job';
  const job = data as JobPost;
  const profile = data as UserProfile;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
      {isJob ? (
        // Job Post Card
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {job.companyLogo && (
              <Image
                src={job.companyLogo}
                alt={job.company}
                width={60}
                height={60}
                className="rounded-full"
              />
            )}
            <div>
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">{job.location}</p>
            <p className="text-gray-700">{job.salary}</p>
            <p className="text-gray-600">{job.description}</p>
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((req, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // User Profile Card
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {profile.profilePicture && (
              <Image
                src={profile.profilePicture}
                alt={profile.name}
                width={80}
                height={80}
                className="rounded-full"
              />
            )}
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-gray-600">{profile.title}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">{profile.location}</p>
            <p className="text-gray-600">{profile.bio}</p>
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
          </div>
        </div>
      )}
    </div>
  );
} 