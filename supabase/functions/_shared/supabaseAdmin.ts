import { createClient } from "supabase-js";

export async function getUser(req: Request) {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: { headers: { Authorization: req.headers.get("Authorization")! } },
    },
  );
  return await supabaseClient.auth.getUser();
}

export async function getRole(req: Request) {
  let id;
  {
    const { data, error } = await getUser(req);
    if (error) {
      return null;
    }
    id = data.user.id;
  }

  const { data, error } = await createAdminClient()
    .from("user_roles")
    .select("role")
    .eq("id", id);
  if (error || !data || data.length < 1) {
    return null;
  }
  return data[0].role;
}

export async function isAdmin(req: Request) {
  return await getRole(req) === "admin";
}

export async function isAdminOrServiceRole(req: Request) {
  console.log(req.headers.get("Authorization"));
  return req.headers.get("Authorization")?.substring(7) === Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || await isAdmin(req);
}

export function createAdminClient() {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
  return supabaseClient;
}
