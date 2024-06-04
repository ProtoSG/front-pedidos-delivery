import { useEffect, useState } from "react";
import { updateAdmin } from "../../../services/admin_service";

export default function useUpdateAdmin(username, checkPassword, password) {
  const [admin, setAdmin] = useState({});
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [errorAdmin, setErrorAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const admin = await updateAdmin(username, checkPassword, password);
        setAdmin(admin);
        setLoadingAdmin(false);
      } catch (error) {
        setErrorAdmin(error.message);
        setLoadingAdmin(false);
      }
    };
    fetchAdmin();
  }, []);

  return { admin, loadingAdmin, errorAdmin };
}

