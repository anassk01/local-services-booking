import { useEffect, useState } from "react";
import { getServices } from "../services/getServices";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  return loading ? (
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
        </div>
      );
    })
  ) : (
    <div>no services found</div>
  );
}
