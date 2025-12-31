"use client";
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  const errorMessage = 
    'Missing Supabase environment variables.\n' +
    'Please create a .env.local file in the project root with:\n' +
    'NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url\n' +
    'NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key';
  
  if (typeof window !== 'undefined') {
    console.error(errorMessage);
  } else {
    // During SSR, we need to provide valid values to prevent crashes
    // The client will still fail at runtime, but won't crash the build
  }
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Create supabase client with fallback values to prevent initialization errors
// Note: Operations will fail if env vars are not set, but the app won't crash
export const supabase = createClient<Database>(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder',
  {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      persistSession: !!SUPABASE_URL && !!SUPABASE_PUBLISHABLE_KEY,
      autoRefreshToken: !!SUPABASE_URL && !!SUPABASE_PUBLISHABLE_KEY,
    }
  }
);