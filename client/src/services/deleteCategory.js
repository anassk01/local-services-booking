import client from "./api";
export async function deleteCategory(id) {
  const response = await client.delete(`/categories/${id}`);
  return response.data;
}
