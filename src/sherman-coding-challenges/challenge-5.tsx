import React, { createContext, useContext, useEffect, useState } from "react";
import './challenge-5.scss';

type UserState = { [key: string]: boolean };

interface StateContext {
    userState: UserState;
    setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

const UserContext = createContext<StateContext | undefined>(undefined);

function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export const Challenge5 = () => {
    const [userState, setUserState] = useState<UserState>({
        Bob: true,
        Gary: true,
        Jessica: true,
        Sam: true,
        Eric: true,
    });

    const setRandomPersonStatus = () => {
        const rand = randomNumber(0, 5);
        const keys = Object.keys(userState);
        const newUsers = Object.assign({}, userState);
        newUsers[keys[rand]] = !newUsers[keys[rand]];
        setUserState(newUsers);
    }

    useEffect(() => {
        const interval = window.setInterval(setRandomPersonStatus, 500);
        return () => window.clearInterval(interval);
    }, [setRandomPersonStatus, userState]);

    return (
        <>
            <h3>Challenge 5</h3>
            <hr />
            <UserContext.Provider value={{ userState, setUserState }}>
                <PersonStatus />
            </UserContext.Provider>
        </>
    );
};

const PersonStatus = () => {
    const personContext = useContext(UserContext);
    if (!personContext || !personContext.userState) return null;

    return (
        <div className={'d-flex flex-column'}>
            {Object.keys(personContext.userState).map(x => {
                const isEnabled = personContext?.userState[x];
                return (
                    <div className={'d-flex'} key={x}>
                        {x}: <div className={'status'} style={{ backgroundColor: isEnabled ? 'green' : 'red' }} />
                    </div>
                );
            })}
        </div>
    );
};


