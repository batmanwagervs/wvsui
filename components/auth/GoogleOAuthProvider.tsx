"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function GoogleOAuthProviderWrapper({ children }: Props) {
  // Use a dummy client ID if not set to prevent runtime errors
  // The actual sign-in button will be disabled if no valid client ID
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "dummy-client-id";

  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    console.warn("⚠️ NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set - Google OAuth will be disabled");
    console.warn("To enable Google OAuth, add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your .env.local file");
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
