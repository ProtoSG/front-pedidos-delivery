import { useEffect, useState } from "react"
import { getRankCategoria } from "../../../services/categoria_service"

export default function useRankCategoria({date}) {
    const [categorias, setCategorias] = useState([])
    const [loadingCategorias, setLoadingCategorias] = useState(false)
    const [errorCategorias, setErrorCategorias] = useState(null)

    useEffect(() => {
        async function fetchRank(){
            try {
                setLoadingCategorias(true)
                setErrorCategorias(null)
                const datos = await getRankCategoria({date})
                setCategorias(datos)
            } catch (e) {
                setErrorCategorias(e.message)
            } finally{
                setLoadingCategorias(false)
            }
        }

        fetchRank();
    },[])
  return {categorias, loadingCategorias, errorCategorias}
}
