import { useEffect, useState } from "react";
import { getAllReservation } from "../services/getAllReservations";
import { updateReservationStatus } from "../services/updateReservationStatus";
function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickStatus, setClickStatus] = useState();
  const [changedStatus, setChangedStatus] = useState("pending");
  const [updateError, setUpdateError] = useState(null);
  const [updateProgress, setUpdateProgress] = useState(false);
  const [lastUpdatedReservation, setLastUpdatedReservation] = useState({});

  async function UpdateReservationStatus(id, status) {
    const payload = { status: status };
    setUpdateError(null);
    setUpdateProgress(true);
    try {
      const result = await updateReservationStatus(id, payload);
      setLastUpdatedReservation(result);
      setClickStatus();
    } catch {
      setUpdateError("cannot update status");
    } finally {
      setUpdateProgress(false);
    }
  }
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
  }, [lastUpdatedReservation]);
  return (
    <>
      <h2>Reservations management</h2>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : reservations.length > 0 ? (
        reservations.map((item) => {
          return (
            <div className="card" key={item._id}>
              <div>
                <button
                  disabled={clickStatus}
                  type="button"
                  onClick={() => {
                    setClickStatus(item._id);
                    setChangedStatus(item.status);
                  }}
                >
                  change status
                </button>
                {clickStatus === item._id ? (
                  <div>
                    <div className="actions">
                      <select
                        name=""
                        value={changedStatus}
                        onChange={(event) =>
                          setChangedStatus(event.target.value)
                        }
                      >
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                      <button type="button" onClick={() => setClickStatus()}>
                        cancel
                      </button>
                      <button
                        type="submit"
                        disabled={updateProgress}
                        onClick={() =>
                          UpdateReservationStatus(item._id, changedStatus)
                        }
                      >
                        change
                      </button>
                    </div>
                    {updateProgress ? (
                      <div>updaing...</div>
                    ) : (
                      updateError && <div>{updateError}</div>
                    )}
                  </div>
                ) : (
                  <div>Status: {item.status}</div>
                )}
              </div>

              <div>User Name : {item.user.name}</div>
              <div>User Email: {item.user.email}</div>
              <div>Service Title: {item.service.title}</div>
              <div>Reservation Date: {item.date.slice(0, 10)}</div>
              <div>Reservation Time: {item.time}</div>
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
