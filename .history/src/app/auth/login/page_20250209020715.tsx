'use client';
import { createClient } from "@supabase/supabase-js";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON!
);

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session?.user) return;

      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        const userType = session.user.user_metadata.user_type;
        
        if (!userType) {
          router.push('/selection');
          return;
        }
        
        if (userType === 'recruiter') {
          const response = await fetch(`/api/recruiter/profile/check/${session.user.id}`);
          const { hasProfile } = await response.json();
          
          if (hasProfile) {
            router.push('/recruiter/dashboard');
          } else if (window.location.pathname !== '/recruiter/profile-setup') {
            router.push('/recruiter/profile-setup');
          }
        } else {
          router.push('/feed/jobseeker');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Welcome to SwipedIn</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#000000',
                  brandAccent: '#333333',
                  inputText: '#333333',
                  inputBorder: '#CCCCCC',
                },
                fontSizes: {
                  baseBodySize: "16px",
                  baseInputSize: "14px",
                },
                radii: {
                  inputBorderRadius: "8px",
                  buttonBorderRadius: "8px",
                },
              },
            },
          }}
          theme="light"
          providers={["github", "google"]}
        />
      </div>
    </div>
  );
} 