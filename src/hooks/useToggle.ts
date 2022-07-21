import { useState } from "react";

export const useToggle = (defaultValue: boolean | unknown) => {
    const [value, setValue] = useState(defaultValue);

    function toggleValue(value: boolean | unknown) {
        setValue((prevState: boolean | unknown) =>
            typeof value === "boolean" ? value : !prevState
        );
    }

    return [value, toggleValue];
};
