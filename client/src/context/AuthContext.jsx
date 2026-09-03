import { createContext } from "react";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/getCurrentUser";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);
  const [token, setToken] = useState(loadToken);
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    async function verifiedUser() {
      try {
        const result = await getCurrentUser();
        setUser(result.user);
      } catch {
        logout();
      } finally {
        setChecking(false);
      }
    }
    if (!token) {
      setChecking(false);
      return;
    }

    verifiedUser();
  }, []);

  function loadUser() {
    const localUser = localStorage.getItem("user");

    if (!localUser) {
      return null;
    }
    return JSON.parse(localUser);
  }

  function loadToken() {
    const localToken = localStorage.getItem("token");

    if (!localToken) {
      return null;
    }
    return localToken;
  }

  function startSession(data) {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    localStorage.setItem("token", data.token);
  }
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  return (
    <AuthContext.Provider
      value={{ user, token, startSession, logout, checking }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
