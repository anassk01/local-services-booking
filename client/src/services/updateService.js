import client from "./api";
export async function updateService(id, payload) {
  const response = await client.put(`/services/${id}`, payload);
  return response.data.service;
}
