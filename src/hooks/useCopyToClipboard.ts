import { useState } from "react";
import copy from "copy-to-clipboard";

export interface CopyOptions {
    debug?: boolean;
    message?: string;
    format?: string; // MIME type
    onCopy?: (clipboardData: object) => void;
}

export default function useCopyToClipboard() {
    const [value, setValue] = useState<string>();
    const [success, setSuccess] = useState<boolean>();

    const copyToClipboard = (text: string, options: CopyOptions) => {
        const result = copy(text, options);
        if (result) setValue(text);
        setSuccess(result);
    };

    return [copyToClipboard, { value, success }];
}
