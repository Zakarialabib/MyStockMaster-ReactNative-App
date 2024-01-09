import {useCallback, useEffect, useState} from "react";

export default function useFetchOnCall(callback, dependencies = []) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [value, setValue] = useState(null)

    const call = useCallback(async (data) => {
        setLoading(true)
        await callback(data)
            .then(res=>res.json())
            .then(setValue)
            .catch(setError)
            .finally(() => setLoading(false))
    }, dependencies)

    return { value, error, loading, call }
}