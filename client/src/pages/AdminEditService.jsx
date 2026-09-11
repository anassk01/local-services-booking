import { useEffect, useState } from "react";
import { getServiceById } from "../services/getServicesById";
import { updateService } from "../services/updateService";
import { useParams } from "react-router-dom";
import { getCategories } from "../services/getCategories";
export default function AdminEditService() {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loadingEdit, setloadingEdit] = useState(false);
  const [errorEdit, setErrorEdit] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  const [editied, setEditied] = useState(false);
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

    async function retrieveService(id) {
      setLoading(true);
      setError(null);

      try {
        const results = await getServiceById(id);
        setService(results);

        setTitle(results.title);
        setDescription(results.description);
        setCity(results.city);
        setPrice(results.price);
        setCategory(results.category._id);
      } catch {
        setError("cannot get service");
      } finally {
        setLoading(false);
      }
    }
    retrieveService(id);
    retreiveCategories();
  }, [id]);

  async function EditService(event) {
    event.preventDefault();
    setloadingEdit(true);
    setErrorEdit(null);
    setEditied(false);

    const payload = {
      title: title,
      description: description,
      city: city,
      price: price,
      category: category,
    };

    try {
      const result = await updateService(id, payload);
      setService(result);
      setTitle(result.title);
      setDescription(result.description);
      setCity(result.city);
      setPrice(result.price);
      setCategory(result.category._id);
      setEditied(true);
    } catch {
      setErrorEdit("cannot edit service");
    } finally {
      setloadingEdit(false);
    }
  }

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        error
      ) : Object.values(service).length > 0 ? (
        <div>
          <div>edit service</div>
          <form onSubmit={EditService}>
            <label>
              title
              <input
                required
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
            <label>
              description
              <input
                required
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
            <label>
              city
              <input
                required
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </label>
            <label>
              price
              <input
                required
                type="text"
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

            <button disabled={loadingEdit} type="submit">
              submit
            </button>
          </form>
        </div>
      ) : (
        <div>no services found</div>
      )}
      {loadingEdit ? (
        <div>Loading...</div>
      ) : errorEdit ? (
        errorEdit
      ) : (
        editied && <div>service Editied</div>
      )}
    </>
  );
}
