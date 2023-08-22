import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import AuthContext from "./shared/context/auth-context";
import { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [expirationTokenDate, setExpirationTokenDate] = useState<Date | null>(
    null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const login = useCallback(
    (userId: string, token: string, expirationTime: Date | null = null) => {
      setUserId(userId);
      setToken(token);

      expirationTime =
        expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);

      setExpirationTokenDate(expirationTime);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId,
          token,
          expirationTime: expirationTime?.toISOString(),
        })
      );
    },
    []
  );
  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    setExpirationTokenDate(null);
    localStorage.removeItem("userData");
  }, []);
  const value = {
    token,
    userId,
    login,
    logout,
  };

  useEffect(() => {
    let userData;
    const userDataItem = localStorage.getItem("userData");
    if (userDataItem) userData = JSON.parse(userDataItem);
    if (
      userData?.token &&
      userData.expirationTime &&
      new Date() < new Date(userData.expirationTime)
    )
      login(userData.userId, userData.token, new Date(userData.expirationTime));
  }, [login]);

  useEffect(() => {
    let timer;
    if (token && expirationTokenDate)
      timer = setTimeout(
        logout,
        expirationTokenDate.getTime() - new Date().getTime()
      );
    else clearTimeout(timer);
  }, [token, expirationTokenDate, logout]);

  let routes;
  if (token)
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
    <Provider store={store}>
      <AuthContext.Provider value={value}>
        <BrowserRouter>
          <MainNavigation />
          <main>{routes}</main>
        </BrowserRouter>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
