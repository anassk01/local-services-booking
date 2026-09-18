import client from "./api";
export async function deleteUser(id) {
  const response = await client.delete(`/users/${id}`);
  return response.data;
}
