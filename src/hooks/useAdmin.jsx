import { useEffect, useState } from "react";

export default function useAdmin() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      const user = JSON.parse(userLocal);
      if (user.token) {
        setUser(user);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    }
  }, []);

  return { user, setUser };
}
