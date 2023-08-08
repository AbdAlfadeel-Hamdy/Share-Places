import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import AuthContext from "./shared/context/auth-context";
import { useCallback, useState } from "react";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginHandler = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logoutHandler = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  const value = {
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  let routes;
  if (isLoggedIn)
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  else
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
