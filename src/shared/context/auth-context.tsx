import { createContext } from "react";
import { User } from "../../store";

interface AuthContextProps {
  loggedInUser: null | User;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  loggedInUser: null,
  login: (user: User) => {},
  logout: () => {},
});

export default AuthContext;
