export function unauthorized() {
  return Response.json(
    { message: "Unauthorized" },
    { status: 401, headers: { "Content-Type": "application/json" } },
  );
}

export function success() {
  return Response.json(
    { message: "Success" },
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}

export function badRequest(message: string) {
  return Response.json(
    { message },
    { status: 400, headers: { "Content-Type": "application/json" } },
  );
}

export function response(message: string, status: number) {
  return Response.json(
    { message },
    { status, headers: { "Content-Type": "application/json" } },
  );
}

