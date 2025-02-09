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
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const createdAt = new Date(session.user.created_at);
        const signInTime = new Date();
        const isNewUser = (signInTime.getTime() - createdAt.getTime()) < 5000; // Within 5 seconds

        if (isNewUser) {
          router.push('/selection');
        } else {
          router.push('/feed/jobseeker');
        }
      }
    });
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