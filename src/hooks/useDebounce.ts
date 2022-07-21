import { useEffect } from "react";
import { useTimeout, useTimeoutProps } from "./useTimeout";

export interface useDebounceProps extends useTimeoutProps {
    dependencies: Array<any>;
}

export const useDebounce = ({ callback, delay, dependencies }: useDebounceProps) => {
    const { reset, clear } = useTimeout({ delay, callback });
    useEffect(reset, [...dependencies, reset]);
    useEffect(clear, []);
};
