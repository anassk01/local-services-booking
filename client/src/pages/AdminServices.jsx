import { useEffect, useState } from "react";
import { getServices } from "../services/getServices";
import { deleteService } from "../services/deleteService";
import { Link } from "react-router-dom";
export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletedService, setDeletedService] = useState();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(null);

  async function submitDeletion(id) {
    setLoadingDelete(true);
    setErrorDelete(null);
    setDeletedService(id);
    try {
      await deleteService(id);
      const remainingServices = services.filter((item) => item._id !== id);
      setServices(remainingServices);
    } catch {
      setErrorDelete("cannot delete service");
    } finally {
      setLoadingDelete(false);
    }
  }

  useEffect(() => {
    async function retrieveServices() {
      setLoading(true);
      setError(null);
      try {
        const results = await getServices();
        setServices(results);
      } catch {
        setError("cannot get services");
      } finally {
        setLoading(false);
      }
    }
    retrieveServices();
  }, []);

  return (
    <>
      <Link to="/admin/services/create">create service</Link>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        error
      ) : services.length > 0 ? (
        services.map((item) => {
          return (
            <div key={item._id}>
              <div>{item.title}</div>
              <div>{item.city}</div>
              <div>{item.price}</div>
              <div>{item.category.name}</div>
              <button
                type="button"
                onClick={() => submitDeletion(item._id)}
                disabled={loadingDelete && item._id === deletedService}
              >
                delete
              </button>
              <Link to={`/admin/services/${item._id}/edit`}>edit</Link>
            </div>
          );
        })
      ) : (
        <div>no services found</div>
      )}
      {errorDelete && errorDelete}
    </>
  );
}
