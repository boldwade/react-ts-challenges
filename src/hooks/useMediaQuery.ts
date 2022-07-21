import { useState, useEffect } from "react";
import useEventListener from "./useEventListener";

/**
 * Allow you to listen to when media queries change
 * Triggers a match when the mediaQuery is a match
 * @param mediaQuery = ex: (min-width: 200px)
 */
export default function useMediaQuery(mediaQuery: string) {
    const [isMatch, setIsMatch] = useState(false);
    const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(null);

    useEffect(() => {
        const list = window.matchMedia(mediaQuery);
        setMediaQueryList(list);
        setIsMatch(list.matches);
    }, [mediaQuery]);

    useEventListener("change", e => setIsMatch(e.matches), mediaQueryList);

    return isMatch;
}
