import { cookies, headers } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export function getSupabaseServerClient() {
  const cookieStore = cookies();
  const headerList = headers();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
      headers: {
        get(name: string) {
          return headerList.get(name) ?? undefined;
        },
      },
    },
  );
  return supabase;
}
