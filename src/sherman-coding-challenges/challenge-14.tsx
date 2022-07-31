import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { randomNumber } from "./random-number";
import './challenge-14.scss';

const ONE =
    "https://images.pexels.com/photos/2249528/pexels-photo-2249528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const TWO =
    "https://images.pexels.com/photos/1061141/pexels-photo-1061141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const THREE =
    "https://images.pexels.com/photos/2249530/pexels-photo-2249530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const FOUR =
    "https://images.pexels.com/photos/1061139/pexels-photo-1061139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const FIVE =
    "https://images.pexels.com/photos/1010973/pexels-photo-1010973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const SIX =
    "https://images.pexels.com/photos/4772874/pexels-photo-4772874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

export const Challenge14 = () => {
    const [correctNumber, setCorrectNumber] = useState(-1);
    const captchaImages = new Map<string, number>([
        [ONE, 1],
        [TWO, 2],
        [THREE, 3],
        [FOUR, 4],
        [FIVE, 5],
        [SIX, 6],
    ]);

    const onStartCaptchaClicked = () => setCorrectNumber(randomNumber(1, 6));

    const renderCaptchaImage = (key: any, index: number) => {
        const onClicked = () => correctNumber === captchaImages.get(key)
            ? setCorrectNumber(-1)
            : alert('Intruder!');
        return <Image key={key} src={key} width={120} height={100} onClick={onClicked} style={{ cursor: "pointer" }} />;
    };

    return (
        <>
            <h4>Challenge 14 - Captcha</h4>
            <hr />
            {correctNumber === -1 && (<Button onClick={onStartCaptchaClicked}>I'm not a robot</Button>)}
            {correctNumber > -1 && (`Select ${correctNumber}`)}
            {correctNumber > -1 && (
                <div className={'image-container'}>
                    {[...captchaImages.keys()].map(renderCaptchaImage)}
                </div>
            )}
        </>
    );
};
export default Challenge14;
