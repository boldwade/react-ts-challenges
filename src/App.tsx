import React from 'react';

import "bootstrap/scss/bootstrap.scss";
import './App.scss';

import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./app-routes";

function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;
