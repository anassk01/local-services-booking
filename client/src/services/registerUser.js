import client from "./api";

export async function registerUser(payload) {
  const response = await client.post("/auth/register", payload);
  return response.data;
}
