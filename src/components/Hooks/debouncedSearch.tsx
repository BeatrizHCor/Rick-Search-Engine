import { useCallback, useEffect, useState } from 'react';

const useDebounce = <T extends unknown>(initialValue: T, delay: number): Debounce<T> => {
    const [debouncedValue, setDebouncedValue] = useState(initialValue);
    const [value, setValue] = useState(initialValue);

    const updateDebouncedValue = useCallback(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    useEffect(updateDebouncedValue, [updateDebouncedValue]);

    return [debouncedValue, setValue];
};

type Debounce<T> = [T, (newValue: T) => void];

export default useDebounce;
