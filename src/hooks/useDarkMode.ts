import { useEffect } from "react";
import { useLocalStorage } from "./useStorage";
import useMediaQuery from "./useMediaQuery";

export default function useDarkMode() {
    const { value: darkMode, setValue: setDarkMode } = useLocalStorage<boolean>({ key: "useDarkMode" });
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const enabled: boolean = (darkMode as boolean) ?? prefersDarkMode;

    useEffect(() => {
        document.body.classList.toggle("dark-mode", enabled);
    }, [enabled]);

    return [enabled, setDarkMode];
}
