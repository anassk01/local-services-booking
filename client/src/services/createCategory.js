import client from "./api";

export async function createCategory(payload) {
  const response = await client.post("/categories", payload);
  return response.data.category;
}
