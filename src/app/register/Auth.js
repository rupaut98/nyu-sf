"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_ANON
);

const AuthUI = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN") {
      router.push("/dashboard");
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Welcome Back!</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  primary: "#4CAF50",
                  background: "#FFFFFF",
                  inputText: "#333333",
                  inputBorder: "#CCCCCC",
                },
                fontSizes: {
                  baseBodySize: "16px",
                  inputText: "14px",
                },
                radii: {
                  inputBorderRadius: "8px",
                  buttonBorderRadius: "8px",
                },
              },
            },
          }}
          theme="light"
          providers={["github", "twitter"]}
          view="sign_in"
        />
      </div>
      
    </div>
  );
};

export default AuthUI;
