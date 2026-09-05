import client from "./api";

export async function getServices(filters) {
  const response = await client.get("/services", { params: filters });
  return response.data.services;
}
