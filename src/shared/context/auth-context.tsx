import { createContext } from "react";

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  login: (userId: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  userId: null,
  login: (userId, token) => {},
  logout: () => {},
});

export default AuthContext;
