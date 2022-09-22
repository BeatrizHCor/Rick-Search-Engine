/* eslint-disable no-unused-vars */
import React from 'react';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import SearchFilters from '../../interfaces/SearchFilters';

const INITIAL_CONTEXT: Stored = [
    {
        name: '',
    },
    () => {},
];
const LOCAL_STORAGE_NAME = 'RickAndMorty';

const localStorageCtx = createContext<Stored>(INITIAL_CONTEXT);
interface IProps {
    children: ReactNode;
}

export const LocalStorageContext = ({ children }: IProps) => {
    const { Provider } = localStorageCtx;
    const [state, setState] = useState(INITIAL_CONTEXT[0]);

    const storeData = useCallback(
        (name: string, data: any) => {
            const newData = {
                ...state,
                [name]: data,
            };
            setState(newData);
            localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(newData));
        },
        [state]
    );

    const setInitialState = useCallback(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_NAME);
        setState(stored ? JSON.parse(stored) : INITIAL_CONTEXT[0]);
    }, []);

    useEffect(setInitialState, [setInitialState]);

    const context: Stored = useMemo(() => [state, storeData], [state, storeData]);

    return <Provider value={context}>{children}</Provider>;
};

const useLocalStorage = () => {
    return useContext(localStorageCtx);
};
type Stored = [SearchFilters, (name: string, data: SearchFilters) => void];

export default useLocalStorage;
