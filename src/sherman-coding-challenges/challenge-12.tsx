import React, { useState } from "react";
import { Image } from "react-bootstrap";

const EMPTY_STAR =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png";
const FULL_STAR =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1200px-Gold_Star.svg.png";

export const Challenge12 = () => {
    const [hoverRating, setHoverRating] = useState(-1);
    const [rating, setRating] = useState(-1);

    const onStarMouseOver = (index: number) => {
        if (index < rating) setRating(-1);
        setHoverRating(index);
    };

    const getSrc = (index: number) =>  {
        const hoverIndex = hoverRating > -1 ? hoverRating : rating;
        return hoverIndex >= index ? FULL_STAR : EMPTY_STAR
    }

    const renderStar = (_: any, index: number) =>
        <Image key={index}
               height={50}
               onMouseOver={() => onStarMouseOver(index)}
               onMouseOut={() => setHoverRating(-1)}
               onClick={() => setRating(index)}
               src={getSrc(index)}
               width={50}
        />;

    return (
        <>
            <h4>Challenge 12 - Rating Starts</h4>
            <hr />
            <div style={{ display: "flex" }}>
                {Array.from({ length: 5 }).map(renderStar)}
            </div>
        </>
    );
};
export default Challenge12;
