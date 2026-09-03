import client from "./api";
export async function getCurrentUser() {
  const response = await client.get("/auth/me");
  return response.data;
}
