import client from "./api";

export async function updateReservationStatus(id, payload) {
  const response = await client.put(`/reservations/${id}/status`, payload);
  return response.data.reservation;
}
