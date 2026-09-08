import client from "./api";
export async function cancelReservation(id) {
  const response = await client.delete(`/reservations/${id}`);
  return response.data.reservation;
}
