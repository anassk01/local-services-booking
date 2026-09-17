import { useEffect, useState } from "react";
import { getAllReservation } from "../services/getAllReservations";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function GetReservations() {
      setLoading(true);
      setError(null);
      try {
        const results = await getAllReservation();
        setReservations(results);
      } catch {
        setError("cannot get Reservations");
      } finally {
        setLoading(false);
      }
    }
    GetReservations();
  }, []);
  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : reservations.length > 0 ? (
        reservations.map((item) => {
          return (
            <div key={item._id}>
              <div>{item.status}</div>
              <div>{item.user.name}</div>
              <div>{item.user.email}</div>
              <div>{item.service.title}</div>
              <div>{item.date}</div>
              <div>{item.time}</div>
            </div>
          );
        })
      ) : (
        <div>no reservations loaded</div>
      )}
    </>
  );
}
export default AdminReservations;
