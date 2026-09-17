import client from "./api";
export async function getAllReservation() {
  const response = await client.get("/reservations");
  return response.data.reservations;
}
