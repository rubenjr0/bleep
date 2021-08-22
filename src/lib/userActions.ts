import { supabase } from "./supabaseClient";
import { userData } from "./sessionStore";

export async function get() {
  try {
    const user = supabase.auth.user();

    let { data, error, status } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      userData.set(data);
    }
  } catch (error) {
    alert(error);
  }
}

export async function update(userName: string) {
  console.log("U");

  try {
    const user = supabase.auth.user();

    const updates = {
      id: user.id,
      username: userName,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal",
    });

    if (error) throw error;
  } catch (error) {
    alert(error);
  }
}

export async function logOut() {
  try {
    let { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error) {
    alert(error);
  }
}
