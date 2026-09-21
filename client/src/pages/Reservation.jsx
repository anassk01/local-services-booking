import { useState } from "react";
import { Reserve } from "../services/createReservation";
import { useParams } from "react-router-dom";

function Reservation() {
  const [reservation, setReservation] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  async function submitReservation(event) {
    event.preventDefault();
    try {
      setBusy(true);
      setError(null);
      const payload = { service: id, date: date, time: time };
      const results = await Reserve(payload);
      setReservation(results);
    } catch (error) {
      let errorMessage = "cannot create reservation";

      if (error.response?.status === 400) {
        errorMessage = "invalid date/time";
      }

      if (error.response?.status === 401) {
        errorMessage = "session expired, please log in again";
      }
      if (error.response?.status === 404) {
        errorMessage = "service not found";
      }
      if (error.response?.status === 409) {
        errorMessage = "time slot already booked";
      }
      setError(errorMessage);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h2>Reserve this service</h2>
      <form onSubmit={submitReservation}>
        <label>
          date
          <input
            type="date"
            required
            onChange={(event) => setDate(event.target.value)}
            value={date}
          />
        </label>
        <label>
          time
          <input
            type="time"
            required
            onChange={(event) => setTime(event.target.value)}
            value={time}
          />
        </label>
        <button className="primary-action" type="submit" disabled={busy}>
          reserve
        </button>
      </form>
      {busy ? (
        <div>in progress ...</div>
      ) : error ? (
        error
      ) : Object.keys(reservation).length > 0 ? (
        <div className="card">
          <div>Status: {reservation.status} </div>
          <div>Time: {reservation.time} </div>
          <div>Date: {reservation.date.slice(0, 10)} </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Reservation;
