import { supabase } from "./supabaseClient";

async function alreadyExists(communityName: string) {
  const { data, error } = await supabase.from("communities").select(
    "name",
  ).ilike("name", `%${communityName}%`);
  if (error) {
    return false;
  }
  if (data.length !== 0) throw "already exists";
}

async function asignCreator(userId: string, communityId: string) {
  const { error } = await supabase.from("created_communities")
    .insert({
      user_id: userId,
      community_id: communityId,
    });
  if (error) throw error;
}

export async function create(userId: string, communityName: string) {
  try {
    await alreadyExists(communityName);
  } catch (err) {
    throw err;
  }
  const { error, data } = await supabase.from("communities").insert({
    creator: userId,
    name: communityName,
    created_at: new Date(),
  });

  if (error) throw error;

  if (data) {
    const { id: communityId } = data[0];
    asignCreator(userId, communityId);
  }
}

async function getCreated(userId: string) {
  const { data, err } = await supabase.from(
    "created_communities",
  ).select(
    "community_id",
  ).eq("user_id", userId);

  if (err) {
    throw err;
  }
  return data.map((community: { community_id: string }) =>
    community.community_id
  );
}

async function getCommunityName(communityId: string): Promise<string> {
  const { data, error } = await supabase.from("communities").select(
    "name",
  ).eq("id", communityId);
  if (error) throw error;
  return data[0].name;
}

export async function get(
  userId: string,
): Promise<string[]> {
  try {
    const created = await getCreated(userId);
    return await Promise.all(created.map(getCommunityName));
  } catch (error) {
    alert(error.message);
    return [];
  }
}
