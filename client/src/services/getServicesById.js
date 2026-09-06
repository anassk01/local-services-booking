import client from "./api";

export async function getServiceById(id) {
  const response = await client.get(`/services/${id}`);
  return response.data.service;
}
