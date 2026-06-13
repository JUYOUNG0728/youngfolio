import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  realtime: {
    log_level: "info",
    logger: (kind: any, msg: any, data: any) => {
      console.log(`[${kind}] ${msg}`, data);
    },
  },
});
