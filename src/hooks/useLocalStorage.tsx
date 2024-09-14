import { useState } from "react";

interface User {
  username: string;
  name: string;
  role: string;
}

interface AuthData {
  user: User | null;
  authToken: string | null;
}

const USER_KEY = "user";
const TOKEN_KEY = "authToken";

export const useLocalStorage = () => {
  const [authData, setAuthData] = useState<AuthData>(() => {
    try {
      const user = localStorage.getItem(USER_KEY);
      const authToken = localStorage.getItem(TOKEN_KEY);
      return {
        user: user ? JSON.parse(user) : null,
        authToken: authToken || null,
      };
    } catch (error) {
      console.error("Error leyendo el localStorage", error);
      return { user: null, authToken: null };
    }
  });

  const setAuthDataLocalStorage = (user: User | null, token: string | null) => {
    try {
      if (user === null && token === null) {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setAuthData({ user: null, authToken: null });
      } else {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token || "");
        setAuthData({ user, authToken: token });
      }
    } catch (error) {
      console.error("Error guardando en el localStorage", error);
    }
  };
  return [authData, setAuthDataLocalStorage] as const;
};
