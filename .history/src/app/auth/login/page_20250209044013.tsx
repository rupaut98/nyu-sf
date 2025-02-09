'use client';
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON!
);

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session?.user) return;

      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        // Read the user type directly from the metadata.
        const userType = session.user.user_metadata.user_type;

        // If the userType is not set, route them to a selection page.
        if (!userType) {
          router.push("/selection");
          return;
        }

        // For this example, we assume that having a userType means
        // the profile is complete and route the user accordingly.
        if (userType === "recruiter") {
          router.push("/recruiter/dashboard");
        } else if (userType === "jobseeker") {
          router.push("/jobseeker/dashboard");
        } else {
          // If there's another user type, you can add additional logic here.
          router.push("/");
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
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Welcome to SwipedIn
        </h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={["github", "google"]}
        />
      </div>
    </div>
  );
}
