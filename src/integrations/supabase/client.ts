// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://smoczvwvavqmsqtngjde.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtb2N6dnd2YXZxbXNxdG5namRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDY0NTIsImV4cCI6MjA2MzQyMjQ1Mn0.CmQ-WgXHDDOQFaocnmgu2QallR5znmTkZ-Gk-ZTTJwQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);