import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import {BrowserRouter} from "react-router-dom";
import {SpacesProvider} from "./Contexts/SpacesContext/SpacesContext";
require("dotenv").config();


ReactDOM.render(<BrowserRouter><SpacesProvider><App/></SpacesProvider></BrowserRouter>, document.getElementById('root'));