import { useCallback, useEffect, useState } from "react";

const useAuth = () => {
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

  return {
    token,
    value,
  };
};

export default useAuth;
