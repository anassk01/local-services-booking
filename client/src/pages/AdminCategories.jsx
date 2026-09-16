import { useEffect, useState } from "react";
import { getCategories } from "../services/getCategories";
import { createCategory } from "../services/createCategory";
import { deleteCategory } from "../services/deleteCategory";
import { updateCategory } from "../services/updateCategory";
function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [createError, setCreateError] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletingId, setDeletingId] = useState();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateClicked, setUpdateClicked] = useState();
  const [draftUpdateName, setDraftUpdateName] = useState();
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
  async function DeleteCategory(id) {
    setDeleteLoading(true);
    setDeleteError(null);
    setDeleted(false);
    try {
      setDeletingId(id);
      await deleteCategory(id);
      setCategories((current) => current.filter((item) => item._id !== id));
      setDeleted(true);
    } catch (error) {
      if (error.response?.status === 409) {
        setDeleteError("name already used by another category");
      } else {
        setDeleteError("category cannot be deleted");
      }
    } finally {
      setDeleteLoading(false);
    }
  }

  async function UpdateCategory(id, name, event) {
    event.preventDefault();
    setUpdateError(null);
    if (!name.trim()) {
      setUpdateError("cannot set an empty name");
      return;
    }
    setUpdateLoading(true);

    const payload = { name: name.trim() };
    try {
      const result = await updateCategory(id, payload);
      setCategories((current) =>
        current.map((entry) => (entry._id === result._id ? result : entry)),
      );
      setUpdateClicked(null);
    } catch (error) {
      if (error.response?.status === 409) {
        setUpdateError("category is still used by a service");
      } else {
        setUpdateError("cannot update the category name");
      }
    } finally {
      setUpdateLoading(false);
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
        <>
          {categories.map((item) => {
            return (
              <form
                key={item._id}
                onSubmit={(event) =>
                  UpdateCategory(item._id, draftUpdateName, event)
                }
              >
                {item._id === updateClicked ? (
                  <div>
                    <input
                      type="text"
                      value={draftUpdateName}
                      onChange={(event) =>
                        setDraftUpdateName(event.target.value)
                      }
                    />
                    <button
                      disabled={updateLoading && updateClicked === item._id}
                      type="submit"
                    >
                      save
                    </button>
                  </div>
                ) : (
                  <div>{item.name}</div>
                )}
                <button
                  type="button"
                  disabled={updateLoading}
                  value={item._id}
                  onClick={(event) => {
                    setUpdateClicked(event.target.value);
                    setDraftUpdateName(item.name);
                  }}
                >
                  update
                </button>
                <button
                  type="button"
                  disabled={deleteLoading}
                  onClick={() => DeleteCategory(item._id)}
                >
                  delete
                </button>
                {deleteLoading && deletingId === item._id && <div>deleing</div>}
                {updateLoading && updateClicked === item._id && (
                  <div>deleing</div>
                )}
              </form>
            );
          })}
          {deleteLoading ? (
            <div>deleing ... </div>
          ) : (
            deleteError && <div>{deleteError}</div>
          )}

          {updateError && <div>{updateError}</div>}
        </>
      ) : (
        <div>no categories found</div>
      )}
      {deleted && <div> category deleted</div>}
    </>
  );
}

export default AdminCategories;
