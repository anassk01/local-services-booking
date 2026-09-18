import client from "./api";
export async function getAllUsers() {
  const response = await client.get("/users");
  return response.data.users;
}
