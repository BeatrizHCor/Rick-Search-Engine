import React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import useDebounce from './debouncedSearch';
import SearchFilters from '../../interfaces/SearchFilters';
import axiosInstance from '../../config/AxiosInstance';

const INITIAL_STATE: SearchFilters = {
    name: '',
};

const usePaginatedResult = <T, U extends SearchFilters>(route: string) => {
    const [results, setResults] = useState<T[]>([]);
    const [search, setSearch] = useDebounce<U>(INITIAL_STATE as U, 1000);
    const [stored, setStored] = useLocalStorage();
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [count, setCount] = useState(0);

    const resultsDisplay = useMemo(
        () => (
            <>
                {count <= 0 ? (
                    <p className="Counter">No results found</p>
                ) : (
                    <p className="Counter">
                        {count} {route}s Found
                    </p>
                )}
            </>
        ),
        [count]
    );
    useEffect(() => {
        setPage(1);
    }, [search]);

    // Essa função é uma extração para setar
    // quantas páginas foram encontrada e os resultados
    const updateResults = useCallback((obj: any) => {
        setMaxPages(obj.info.pages);
        setResults(obj.results);
        setCount(obj.info.count);
    }, []);

    // Estou armazenando as páginas sem busca em local storage
    const retrieveFromStorage = useCallback(() => {
        // Se não há busca, apenas todos os resultados
        if (!search.name) {
            // Verifico se tenho os dados armazenados
            const inLocalStorage = stored && stored[`${route}-${page}`];
            if (inLocalStorage) {
                // Se estiver armazenado carrego dele
                updateResults(inLocalStorage);
                return true;
            }
        }
        return false;
    }, [search, stored, updateResults, page, route]);

    const fetchData = useCallback(() => {
        let uri = `/${route}/?page=${page}`;
        const initialUri = uri;
        for (const key of Object.keys(search)) {
            const value = search[key];
            if (value) {
                uri += `&${key}=${value}`;
            }
        }
        if (uri === initialUri) {
            if (retrieveFromStorage()) {
                return;
            }
        }

        axiosInstance
            .get(uri)
            .then((response) => {
                const { data } = response;
                if (data.error) {
                    setResults([]);
                    setCount(0);
                    setMaxPages(1);
                    return;
                }
                if (uri === initialUri) {
                    setStored(`${route}-${page}`, data);
                }

                updateResults(data);
            })
            .catch(() => {
                setResults([]);
                setCount(0);
                setMaxPages(1);
            });
    }, [search, page]);

    // Novamente o fetchData em um useCallback
    useEffect(fetchData, [fetchData]);

    const nextPage = useCallback(
        () => setPage((actual) => (actual < maxPages ? actual + 1 : actual)),
        [maxPages]
    );

    const previousPage = useCallback(
        () => setPage((actual) => (actual >= 1 ? actual - 1 : actual)),
        []
    );
    const verifyPrevPage = useMemo(() => page <= 1, [page]);
    const verifyNextPage = useMemo(() => page >= maxPages, [page, maxPages]);

    return {
        results,
        previousPage,
        nextPage,
        setSearch,
        verifyNextPage,
        verifyPrevPage,
        search,
        count,
        resultsDisplay,
    };
};

export default usePaginatedResult;
