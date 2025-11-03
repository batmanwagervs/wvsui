"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "./AuthProvider";

interface SupabaseSignInButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export function SupabaseSignInButton({
  onSuccess,
  onError,
  disabled,
}: SupabaseSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSupabaseLogin = async () => {
    try {
      setIsLoading(true);

      // Sign in with Google OAuth through Supabase
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // The OAuth flow will redirect, so we don't need to call login() here
      // The auth callback will handle the session setup
      console.log("Supabase OAuth initiated:", data);
      
    } catch (error) {
      console.error("Supabase auth error:", error);
      onError?.(
        error instanceof Error ? error.message : "Supabase authentication failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSupabaseLogin}
      disabled={isLoading || disabled}
      className="h-12 w-full bg-[#9A2BD8] hover:bg-[#9A2BD8]/90 text-white"
    >
      <Image
        src="/icon/google.svg"
        alt="Google"
        width={20}
        height={20}
        className="mr-2"
      />
      {isLoading ? "Signing in..." : "Continue with Google"}
    </Button>
  );
}
