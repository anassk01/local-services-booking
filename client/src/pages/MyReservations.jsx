import { useEffect, useState } from "react";
import { getMyReservations } from "../services/getMyReservations";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
            </div>
          );
        })
      ) : (
        <div>no reservations found</div>
      )}
    </>
  );
}
export default MyReservations;
