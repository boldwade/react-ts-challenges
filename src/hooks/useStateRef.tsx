import { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef, useState } from 'react';

export const useStateRef = <T,>(defaultValue: T): [T, Dispatch<SetStateAction<T>>, MutableRefObject<T>] => {
    const [state, setState] = useState<T>(defaultValue);
    const ref = useRef<T>(state);

    const dispatch = useCallback((val: any) => {
      ref.current = typeof val === 'function' ? val(ref.current) : val;

      setState(ref.current);
    }, []);

    return [state, dispatch, ref];
};
