import { Outlet } from "react-router-dom";
import React from "react";

export const ChallengeLayout = () => {
    return (
        <div className={'d-flex flex-column align-items-center'}>
            <Outlet />
        </div>
    );
};


