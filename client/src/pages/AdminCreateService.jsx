import { useEffect, useState } from "react";
import { getCategories } from "../services/getCategories";
import { createService } from "../services/createService";

function AdminCreateService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [service, setService] = useState({});
  const [pending, setPending] = useState(false);
  const [serviceError, setServiceError] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  useEffect(() => {
    async function retreiveCategories() {
      setCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const results = await getCategories();
        setCategories(results);
      } catch {
        setCategoriesError("cannot retrieve categories");
      } finally {
        setCategoriesLoading(false);
      }
    }
    retreiveCategories();
  }, []);

  async function CreateService(event) {
    event.preventDefault();
    if (!title || !description || !price || !city || !category) {
      return;
    }
    setPending(true);
    setServiceError(null);
    const payload = {
      title: title,
      description: description,
      price: price,
      city: city,
      category: category,
    };

    try {
      const result = await createService(payload);
      setService(result);
    } catch {
      setServiceError("cannot create service");
    } finally {
      setPending(false);
    }
  }
  return (
    <>
      <div> create service </div>
      <form onSubmit={CreateService}>
        <label>
          title
          <input
            required
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          description
          <input
            required
            type="text"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        <label>
          city
          <input
            required
            type="text"
            name="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        <label>
          price
          <input
            required
            type="number"
            name="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <label>
          {categoriesLoading ? (
            <div>Loading... </div>
          ) : categoriesError ? (
            <div>{categoriesError}</div>
          ) : (
            <select
              required
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">choose category</option>
              {categories.length > 0 &&
                categories.map((item) => {
                  return (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          )}
        </label>
        <button type="submit" disabled={pending}>
          submit
        </button>
      </form>

      {serviceError ? (
        <div>{serviceError}</div>
      ) : (
        Object.values(service).length > 0 && (
          <div>
            <div>service created Details</div>
            <div>{service.title}</div>
            <div>{service.description}</div>
            <div>{service.city}</div>
            <div>{service.price}</div>
          </div>
        )
      )}
    </>
  );
}

export default AdminCreateService;
