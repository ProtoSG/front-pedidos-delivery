import { useEffect, useState } from "react";
import { getAdmin } from "../services/admin_service";

export default function useAdmin() {
  const [admin, setAdmin] = useState({});
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [errorAdmin, setErrorAdmin] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const admin = await getAdmin();
        setAdmin(admin);
        setLoadingAdmin(false);
      } catch (error) {
        setErrorAdmin(true);
        setLoadingAdmin(false);
      }
    };
    fetchAdmin();
  }, []);

  return { admin, loadingAdmin, errorAdmin };
}
