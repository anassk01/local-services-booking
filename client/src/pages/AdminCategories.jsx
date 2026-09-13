import { useEffect, useState } from "react";
import { getCategories } from "../services/getCategories";
import { createCategory } from "../services/createCategory";
function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [createError, setCreateError] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [created, setCreated] = useState(false);

  async function CreateCategory(event) {
    event.preventDefault();
    if (!categoryName.trim()) {
      setCreateError("cannot input empty or spaces-only name");
      return;
    }
    setCreateLoading(true);
    setCreateError(null);
    try {
      const result = await createCategory({ name: categoryName.trim() });
      setCategories((current) => [...current, result]);
      setCreated(true);
      setCategoryName("");
    } catch (error) {
      if (error.response?.status === 409) {
        setCreateError("category name already exists");
      } else if (error.response?.status === 400) {
        setCreateError("category shouldnt be empty");
      } else {
        setCreateError("cannot create category");
      }
    } finally {
      setCreateLoading(false);
    }
  }

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

  return (
    <>
      <form onSubmit={CreateCategory}>
        <label>
          Category Name
          <input
            required
            type="text"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
          />
        </label>
        <button disabled={createLoading} type="submit">
          submit
        </button>
      </form>
      {createLoading ? (
        <div>Loading</div>
      ) : createError ? (
        <div>{createError}</div>
      ) : (
        created && <div>Category created</div>
      )}
      {loading ? (
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
      )}
    </>
  );
}

export default AdminCategories;
