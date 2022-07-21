import useEventListener from "./useEventListener";
import { useTimeout } from "./useTimeout";
import useEffectOnce from "./useEffectOnce";
import { MutableRefObject } from "react";

export default function useLongPress(ref: MutableRefObject<any>, callback: () => void, { delay }: { delay: number } = { delay: 250 }) {
    const { reset, clear } = useTimeout({ callback, delay });
    // Initialize/Clear out the timeout to start with
    useEffectOnce(clear);

    useEventListener("mousedown", reset, ref.current);
    useEventListener("touchstart", reset, ref.current);

    useEventListener("mouseup", clear, ref.current);
    useEventListener("mouseleave", clear, ref.current);
    useEventListener("touchend", clear, ref.current);
}
