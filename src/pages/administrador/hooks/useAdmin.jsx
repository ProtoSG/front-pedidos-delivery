import { useEffect, useState } from 'react'
import { getAdminById } from '../../../services/admin_service'

export const useAdmin = ({ id }) => {
  const [admin, setAdmin] = useState({})
  const [loadingAdmin, setLoadingAdmin] = useState(false)
  const [errorAdmin, setErrorAdmin] = useState(null)

  useEffect(() => {
    async function fetchAdmin() {
      try {
        setLoadingAdmin(true)
        setErrorAdmin(null)
        const data = await getAdminById({ id })
        setAdmin(data)
      } catch (error) {
        setErrorAdmin(error.message)
      } finally {
        setLoadingAdmin(false)
      }
    }
    fetchAdmin()
  }, [])


  return { admin, loadingAdmin, errorAdmin }
}

