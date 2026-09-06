import { useState } from "react";
import { getServices } from "../services/getServices";
import { useEffect } from "react";
import { getCategories } from "../services/getCategories";
import { Link } from "react-router-dom";
export default function Services() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [categoriesError, setCategoriesError] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  function submitSearch(event) {
    event.preventDefault();
    const filters = {};

    if (search.trim()) {
      filters.search = search.trim();
    }
    if (city.trim()) {
      filters.city = city.trim();
    }
    if (category) {
      filters.category = category;
    }
    retreiveServices(filters);
  }
  async function retreiveServices(filters) {
    setLoading(true);
    setError(null);
    try {
      const results = await getServices(filters);
      setServices(results);
    } catch {
      setError("Unable to load services");
    } finally {
      setLoading(false);
    }
  }
  async function retreiveCategories() {
    setCategoriesError(null);
    setCategoriesLoading(true);
    try {
      const results = await getCategories();
      setCategories(results);
    } catch {
      setCategoriesError("cannot load categories");
    } finally {
      setCategoriesLoading(false);
    }
  }

  useEffect(() => {
    retreiveServices();
    retreiveCategories();
  }, []);

  return (
    <>
      <form onSubmit={submitSearch}>
        <label>
          search
          <input
            type="text"
            value={search}
            name="search"
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <label>
          city
          <input
            type="text"
            value={city}
            name="city"
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        <label>
          Categories
          {categoriesLoading ? (
            <div>Loading ... </div>
          ) : categoriesError ? (
            <div>{categoriesError}</div>
          ) : (
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          )}
        </label>

        <button type="submit">submit</button>
      </form>
      {loading ? (
        <p>Loading... </p>
      ) : error ? (
        <p>{error}</p>
      ) : services.length === 0 ? (
        <p>no services available</p>
      ) : (
        services.map((m) => (
          <div key={m._id}>
            <Link to={`/services/${m._id}`}>{m.title}</Link>
            {m.city} {m.price}
          </div>
        ))
      )}
    </>
  );
}
