import client from "./api";
export async function getCategories() {
  const response = await client.get("/categories");
  return response.data.categories;
}
