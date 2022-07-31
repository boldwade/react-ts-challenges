import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useStateRef } from "../hooks/useStateRef";

export const Challenge13 = () => {
    const minHeight = 50;
    const maxHeight = 100;
    const interval = 10;
    const [height, setHeight, heightRef] = useStateRef(minHeight);
    const [buttonText, setButtonText] = useState('Expand');
    const sizeTimerRef = useRef(0);
    const isExpandedRef = useRef(false);

    const adjustHeight = () => {
        setButtonText(isExpandedRef.current ? 'Shrink' : 'Expand');
        setHeight(prevState => prevState + (interval * (isExpandedRef.current ? 1 : -1)));
        console.log('adjustHeight', heightRef.current);
        if (heightRef.current < minHeight) {
            setHeight(minHeight);
            window.clearInterval(sizeTimerRef.current);
        }
        if (heightRef.current > maxHeight) {
            setHeight(maxHeight);
            window.clearInterval(sizeTimerRef.current);
        }
    };

    const onClicked = () => {
        // window.clearInterval(sizeTimerRef.current);
        isExpandedRef.current = !isExpandedRef.current;
        adjustHeight();
        // sizeTimerRef.current = window.setInterval(adjustHeight, 1000);
    };

    useEffect(() => {
        console.log('useEffect', height);
        sizeTimerRef.current = window.setInterval(adjustHeight, 1000);
        return () => clearInterval(sizeTimerRef.current);
    }, [height, adjustHeight]);

    return (
        <>
            <h4>Challenge 13 - Grow/Shrink button</h4>
            <hr />
            <Button onClick={onClicked}
                    style={{ height, width: height * 1.5 }}
            >
                {buttonText}
            </Button>
        </>
    );
};
export default Challenge13;
