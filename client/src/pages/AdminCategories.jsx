import { useEffect, useState } from "react";
import { getCategories } from "../services/getCategories";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function GetCategories() {
      setLoading(true);
      setError(null);
      try {
        const results = await getCategories();
        setCategories(results);
      } catch {
        setError("cannot retrieve categories");
      } finally {
        setLoading(false);
      }
    }
    GetCategories();
  }, []);

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    error
  ) : categories.length > 0 ? (
    categories.map((item) => {
      return (
        <div key={item._id}>
          <div>{item.name}</div>
        </div>
      );
    })
  ) : (
    <div>no categories found</div>
  );
}

export default AdminCategories;
