import { useState } from "react";
import { getServices } from "../services/getServices";
import { useEffect } from "react";

export default function Services() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function retreiveServices() {
      try {
        const results = await getServices();
        setServices(results);
      } catch {
        setError("Unable to load services");
      } finally {
        setLoading(false);
      }
    }
    retreiveServices();
  }, []);
  return loading ? (
    <p>Loading... </p>
  ) : error ? (
    <p>{error}</p>
  ) : services.length === 0 ? (
    <p>no services available</p>
  ) : (
    services.map((m) => (
      <div key={m._id}>
        {m.title} {m.city} {m.price}
      </div>
    ))
  );
}
