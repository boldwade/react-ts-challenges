import React from "react";

export const Challenge10 = () => {
    const INPUT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 5, 3, 5, 7, 4, 2, 3];

    return (
        <>
            <h4>Challenge 10 - Recursive divide (merge sort)</h4>
            <hr />
            {JSON.stringify(INPUT)}
            <ArraySplitter input={INPUT} />
        </>
    );
};
export default Challenge10;

const ArraySplitter = ({ input }: { input: number[] }) => {
    const half = input.length / 2;
    const leftSideCount = Math.floor(half);
    const leftSide = input.slice(0, leftSideCount);
    const rightSide = input.slice(leftSideCount);

    return (
        <div className={'d-flex w-100 mt-5'}>
            <div className={'d-flex flex-column align-items-center w-100'}>
                {JSON.stringify(leftSide)}
                {leftSideCount > 1 && (<ArraySplitter input={leftSide} />)}
            </div>
            <div className={'d-flex flex-column align-items-center w-100'}>
                {JSON.stringify(rightSide)}
                {half > 1 && (<ArraySplitter input={rightSide} />)}
            </div>
        </div>
    );
};
