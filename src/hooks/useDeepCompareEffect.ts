import { useEffect, useRef } from "react";
import { isEqual } from 'lodash';

/**
 * Does a deep comparison on the dependencies list before triggering the useEffect
 * Useful in situations where the dependency is an object, and maybe you don't want
 * to spread it all out
 * @param callback
 * @param dependencies
 */
export default function useDeepCompareEffect(callback: () => void, dependencies: Array<any>) {
    const currentDependenciesRef = useRef<Array<any>>();

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
        currentDependenciesRef.current = dependencies;
    }

    useEffect(callback, [currentDependenciesRef.current]);
}
