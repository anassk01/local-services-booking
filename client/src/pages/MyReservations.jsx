import { useEffect, useState } from "react";
import { getMyReservations } from "../services/getMyReservations";
import { cancelReservation } from "../services/cancelReservation";
function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [canceledReservation, setCanceledReservation] = useState("");
  const [cancelError, setCancelError] = useState(null);
  async function myReservations() {
    try {
      const results = await getMyReservations();
      setReservations(results);
    } catch {
      setError("cannot get reservations");
    } finally {
      setLoading(false);
    }
  }

  async function deleteReservation(id) {
    setCancelError(null);
    setPending(true);
    setCanceledReservation(id);
    try {
      const canceled = await cancelReservation(id);
      const remainingReservations = reservations.filter(
        (item) => item._id !== canceled._id,
      );
      setReservations(remainingReservations);
    } catch {
      setCancelError("unable to delete reservation");
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    myReservations();
  }, []);
  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        error
      ) : reservations.length > 0 ? (
        reservations.map((item) => {
          return (
            <div key={item._id}>
              <div>
                <div>{item.date}</div>
                <div>{item.time}</div>
                <div>{item.status}</div>

                <span>service:</span>
                <div>
                  <span>title:</span> {item.service.title}
                </div>
                <div>{item.service.city}</div>
                <div>{item.service.price}</div>
              </div>
              <button
                disabled={pending && item._id === canceledReservation}
                onClick={() => deleteReservation(item._id)}
              >
                cancel reservation
              </button>
            </div>
          );
        })
      ) : (
        <div>no reservations found</div>
      )}
      {cancelError && <div>{cancelError}</div>}
    </>
  );
}
export default MyReservations;
