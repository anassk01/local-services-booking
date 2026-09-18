import client from "./api";
export async function getUserById(id) {
  const response = await client(`/users/${id}`);
  return response.data.user;
}
