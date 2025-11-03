import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

interface JwtPayload {
  userId: string; // Supabase UUIDs are strings
}

// This function replaces the old 'authenticateToken' middleware
export const findUserByToken = async (req: NextApiRequest) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Server-only Supabase admin client (SERVICE ROLE must NOT be exposed)
    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string
    );

    // Find the user in Supabase by their ID
    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", decoded.userId)
      .single();

    if (error || !user) {
      return null;
    }

    // Return the full user object
    return user;
  } catch (error) {
    // Invalid token, expired, etc.
    return null;
  }
};
