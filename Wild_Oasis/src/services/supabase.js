import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nukrckwtzedwylkpsieu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51a3Jja3d0emVkd3lsa3BzaWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyNDAwMzgsImV4cCI6MjAyMzgxNjAzOH0.xC38tt0UvDnND_83yZSQ3MtqCCOP77Ce7U-ju2kxktE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
