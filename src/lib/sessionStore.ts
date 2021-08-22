import { Writable, writable } from "svelte/store";
import type { User } from "@supabase/supabase-js";

export const userSession: Writable<User> = writable(null);
export const userData = writable(null);
