import client from "./api";

export async function getServices() {
  const response = await client.get("/services");
  return response.data.services;
}
