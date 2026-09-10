import client from "./api";
export async function createService(payload) {
  const response = await client.post("/services", payload);
  return response.data.service;
}
