import client from "./api";

export async function deleteService(id) {
  const response = await client.delete(`/services/${id}`);
  return response.data;
}
