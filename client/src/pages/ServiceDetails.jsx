import { useParams } from "react-router-dom";
import { getServiceById } from "../services/getServicesById";
import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
function ServiceDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [service, setService] = useState({});
  const { token } = useContext(AuthContext);
  async function retreiveService(id) {
    setLoading(true);
    setError(null);
    try {
      const resutls = await getServiceById(id);
      setService(resutls);
    } catch (error) {
      if (error.response?.status === 404) {
        setError("service not found");
      } else {
        setError("cannot load service");
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    retreiveService(id);
  }, [id]);

  return (
    <>
      <h2>Service Details</h2>
      {loading ? (
        <div>Loading ... </div>
      ) : error ? (
        error
      ) : (
        <div className="card">
          {service.image && (
            <img src={service.image} alt={service.description} />
          )}
          <div>Title: {service.title}</div>
          <div>Description: {service.description}</div>
          <div>City: {service.city}</div>
          <div>Price: {service.price}</div>
          <div>Category: {service.category.name}</div>
          {token && Object.values(service).length > 0 && !loading && !error && (
            <Link className="primary-action" to={`/reservation/${service._id}`}>
              Reserve
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default ServiceDetails;
