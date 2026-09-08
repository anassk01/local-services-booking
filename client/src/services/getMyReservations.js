import client from "./api";

export async function getMyReservations() {
  const response = await client.get("/reservations/my");
  return response.data.reservations;
}
