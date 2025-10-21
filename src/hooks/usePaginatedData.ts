import { useState, useEffect } from "react";

interface UsePaginatedDataOptions<T> {
    fetchFunction: (page: number, limit: number) => Promise<{
        success: boolean;
        data?: T[];
        pagination?: any;
        error?: string;
        message?: string;
    }>;
    limit?: number;
}

export function usePaginatedData<T>({ fetchFunction, limit = 10 }: UsePaginatedDataOptions<T>) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Carga inicial
    const loadData = async (page: number = 1, append: boolean = false) => {
        try {
            if (page === 1 && !append) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const response = await fetchFunction(page, limit);

            if (response.success && response.data && response.pagination) {
                if (append) {
                    setData(prev => [...prev, ...response.data!]);
                } else {
                    setData(response.data);
                }
                
                setCurrentPage(response.pagination.currentPage);
                setHasMoreData(response.pagination.hasNextPage);
                setError(null);
            } else {
                setError(response.error || 'Error al cargar datos');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
            setLoadingMore(false);
            setRefreshing(false);
        }
    };

    // Cargar más datos (scroll infinito)
    const loadMore = async () => {
        if (hasMoreData && !loadingMore) {
            await loadData(currentPage + 1, true);
        }
    };

    // Refrescar datos
    const refresh = async () => {
        setRefreshing(true);
        await loadData(1, false);
    };

    // Carga inicial
    useEffect(() => {
        loadData(1, false);
    }, []);

    return {
        data,
        loading,
        loadingMore,
        refreshing,
        hasMoreData,
        error,
        loadMore,
        refresh,
        setData // Para actualizar manualmente (ej: eliminar items)
    };
}