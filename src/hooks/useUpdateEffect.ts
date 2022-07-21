import { useEffect, useRef } from "react";

export interface useUpdateEffectProps {
    callback: () => void;
    dependencies: Array<any>;
}

export const useUpdateEffect = ({ callback, dependencies }: useUpdateEffectProps) => {
    const firstRenderRef = useRef(true);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback();
    }, dependencies);
};
