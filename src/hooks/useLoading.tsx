import { useState } from "react"

export const useLoading = () => {
    const [isLoading, setLoading] = useState(false);

    const loading = () => {
        setLoading(true);
    }

    const stopLoading = () => {
        setLoading(false);
    }

    return { isLoading, loading, stopLoading };
}