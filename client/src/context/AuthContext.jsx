import { createContext } from "react";
import { useState } from "react";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  function startSession(data) {
    setUser(data.user);
    setToken(data.token);
  }
  return (
    <AuthContext.Provider value={{ user, token, startSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
