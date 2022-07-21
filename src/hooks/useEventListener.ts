import { useEffect, useRef } from "react";

/**
 * Adds an eventListener for which to react on
 * @param eventType = things like 'resize', 'change', etc
 * @param callback = the function to call on the eventType being triggered
 * @param element = the element for which to listen for the eventType triggered on
 */
export default function useEventListener(
    eventType: string,
    callback: (e: any) => void,
    element: any = window
) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (element == null) return;
        const handler = (e: any) => callbackRef.current(e);
        element.addEventListener(eventType, handler);

        return () => element.removeEventListener(eventType, handler);
    }, [eventType, element]);
}
