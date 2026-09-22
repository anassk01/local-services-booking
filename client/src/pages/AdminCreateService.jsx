import { useEffect, useState } from "react";
import { getCategories } from "../services/getCategories";
import { createService } from "../services/createService";

function AdminCreateService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
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
      image: image,
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
      <h2>create service</h2>
      <form onSubmit={CreateService}>
        <label>
          Title:
          <input
            required
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            required
            type="text"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        <label>
          City:
          <input
            required
            type="text"
            name="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            required
            type="number"
            name="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>

        <label>
          Image:
          <input
            type="text"
            name="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
        {categoriesLoading ? (
          <div>Loading... </div>
        ) : categoriesError ? (
          <div>{categoriesError}</div>
        ) : (
          <label>
            Category
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
          </label>
        )}
        <button className="primary-action" type="submit" disabled={pending}>
          Create Service
        </button>
      </form>

      {serviceError ? (
        <div>{serviceError}</div>
      ) : (
        Object.values(service).length > 0 && (
          <div className="card">
            {service.image && (
              <img src={service.image} alt={service.description} />
            )}
            <div>service created </div>
            <div>Details</div>
            <div>Title: {service.title}</div>
            <div>Description: {service.description}</div>
            <div>City: {service.city}</div>
            <div>Price: {service.price}</div>
          </div>
        )
      )}
    </>
  );
}

export default AdminCreateService;
