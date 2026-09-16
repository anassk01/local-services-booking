import client from "./api";
export async function updateCategory(id, payload) {
  const response = await client.put(`/categories/${id}`, payload);
  return response.data.category;
}
