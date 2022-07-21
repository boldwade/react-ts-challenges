import { useCallback, useState, useEffect } from "react";

export interface useStorageProps<T> {
    key: string;
    defaultValue?: T;
}

export function useLocalStorage<T>(props: useStorageProps<T>) {
    return useStorage<T>(props, window.localStorage);
}

export function useSessionStorage<T>(props: useStorageProps<T>) {
    return useStorage<T>(props, window.sessionStorage);
}

function useStorage<T>({ key, defaultValue }: useStorageProps<T>, storageObject: Storage) {
    const [value, setValue] = useState<T | undefined>(() => {
        const jsonValue = storageObject.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof defaultValue === "function") {
            return defaultValue();
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        if (value === undefined) return storageObject.removeItem(key);
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value, storageObject]);

    const remove = useCallback(() => {
        setValue(undefined);
    }, []);

    return [value, setValue, remove];
}
