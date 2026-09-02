import client from "./api";
export async function login(payload) {
  const response = await client.post("/auth/login", payload);
  return response.data;
}
