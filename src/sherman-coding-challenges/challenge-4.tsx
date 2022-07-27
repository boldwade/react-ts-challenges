import { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";
import { useStateRef } from "../hooks/useStateRef";

const LADDER_IMAGE =
    "https://raw.githubusercontent.com/jusshe/coding-challenge-pictures/main/ladder.png";

export const Challenge4 = () => {
    const [hoverIndex, setHoverIndex] = useState<number>();
    const [ladderLength, setLadderLength, ladderLengthRef] = useStateRef(1);
    const timerRef = useRef<number>(0);

    const addLadder = () => {
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setLadderLength(prevState => prevState += 1);
            if (ladderLengthRef.current < 5) return addLadder();
            window.clearTimeout(timerRef.current);
        }, 1000);
    };

    useEffect(() => {
        addLadder()
        return () => window.clearTimeout(timerRef.current);
    }, []);

    const renderLadderImage = (_: any, index: number) =>
        <LadderImage key={index}
                     index={index}
                     onMouseOver={setHoverIndex}
                     isExpanded={hoverIndex !== undefined && index >= hoverIndex}
        />;

    return (
        <>
            <div>Challenge 4 - Ladder</div>
            <hr />
            {Array.from({ length: ladderLength }).map(renderLadderImage)}
        </>
    );
};

interface LadderImageProps {
    index: number;
    isExpanded: boolean;
    onMouseOver: (index?: number) => void;
}

const LadderImage = ({ index, isExpanded, onMouseOver }: LadderImageProps) => {
    const handleOnMouseOver = () => onMouseOver(index);
    const handleOnMouseOut = () => onMouseOver(undefined);
    return <Image src={LADDER_IMAGE} key={index} style={{ width: isExpanded ? 200 : 100 }}
                  onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut} />;
};

export default Challenge4;
