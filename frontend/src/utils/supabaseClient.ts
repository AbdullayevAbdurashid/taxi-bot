import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zmihooxpfobdfgtflcdm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptaWhvb3hwZm9iZGZndGZsY2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMDIwNDUsImV4cCI6MjAyOTg3ODA0NX0.E6dS2XIjbkBg-XDZpbOLzP8IKVwJd103VNjmLkAPKHs"
);

export default supabase;