import { success } from "../_shared/response.ts";
import { response, badRequest, unauthorized } from "../_shared/response.ts";
import { isAdminOrServiceRole } from "../_shared/supabaseAdmin.ts";
import { createAdminClient } from "../_shared/supabaseAdmin.ts";

Deno.serve(async (req) => {
  if (!await isAdminOrServiceRole(req)) {
    return unauthorized();
  }
  
  const { email } = await req.json();

  if (email === undefined) {
    return badRequest("Email is required");
  }

  const {error} = await createAdminClient().auth.admin.inviteUserByEmail(email);

  if (error) {
    return response(error.message, error.status);
  }
  
  return success();
});
