import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import {BrowserRouter} from "react-router-dom";
import {SpacesProvider} from "./Contexts/SpacesContext/SpacesContext";
import {UserProvider} from "./Contexts/UserContext/UserContext";
require("dotenv").config();


ReactDOM.render(
<BrowserRouter>
    <SpacesProvider>
        <UserProvider>
            <App/>
        </UserProvider>
    </SpacesProvider>
</BrowserRouter>, document.getElementById('root'));