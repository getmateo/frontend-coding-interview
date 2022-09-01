import { createClient } from "@supabase/supabase-js";
import { Database } from "../database";
import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
} from "./constants";

if (!NEXT_PUBLIC_SUPABASE_URL)
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
if (!NEXT_PUBLIC_SUPABASE_ANON_KEY)
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const supabase = createClient<Database>(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
);
