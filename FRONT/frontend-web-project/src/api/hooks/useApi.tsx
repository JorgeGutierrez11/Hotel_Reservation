import { useCallback, useEffect, useState, useRef } from "react";
import { UseApiCall } from "../models/useApi.model";

type UseApiOptions = { autoFetch?: boolean };
type Data<T> = T | null;
type ErrorType = Error | null;

interface UseApiResult<T> {
    loading: boolean;
    data: Data<T>;
    error: ErrorType;
    fetch: () => void;
}

export const useApi = <T,>(apiCall: UseApiCall<T>, options?: UseApiOptions): UseApiResult<T> => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Data<T>>(null);
    const [error, setError] = useState<ErrorType>(null);
    const controllerRef = useRef<AbortController | null>(null);

    const fetch = useCallback(() => {
        const { call, controller } = apiCall;
        controllerRef.current = controller;
        setLoading(true);

        call
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((err) => {
                if (err.name !== "CanceledError" && err.name !== "AbortError") {
                    setError(err);
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [apiCall]);

    useEffect(() => {
        if (options?.autoFetch) {
            const cleanup = fetch();
            return cleanup;
        }

        return () => {
            controllerRef.current?.abort();
        };
    }, [fetch, options]);

    return { loading, data, error, fetch };
};
