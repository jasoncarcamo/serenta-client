import React from 'react';
import logo from '../logo.svg';
import './App.css';
import HeaderNav from "../components/HeaderNav/HeaderNav";
import Map from "../components/Map/Map";
import SearchBox from "../components/SearchBox/SearchBox";
import {Route} from "react-router-dom";

function App() {
  return (
    <section>
        <Route exact path="/" component={HeaderNav}></Route>
        <Route exact path="/" component={SearchBox}></Route>
        <Route exact path="/" component={Map}></Route>

    </section>
  );
}

export default App;
