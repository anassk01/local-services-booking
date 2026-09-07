import client from "./api";

export async function Reserve(payload) {
  const response = await client.post("/reservations", payload);
  return response.data.reservation;
}
