import React from 'react';
import logo from '../logo.svg';
import './App.css';
import HeaderNav from "../components/HeaderNav/HeaderNav";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PostAdRegister from "../components/PostAdRegister/PostAdRegister";
import Map from "../components/Map/Map";
import SearchSpaces from "../components/SearchBoxes/SearchSpaces/SearchSpaces";
import {Route} from "react-router-dom";

function App() {
  return (
    <section>

        <Route exact path="/" component={HeaderNav}></Route>
        <Route exact path="/" component={SearchSpaces}></Route>
        <Route exact path="/" component={Map}></Route>

        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/post-ad" component={PostAdRegister}></Route>
        <Route exact path="/post-ad/register" component={Register}></Route>

    </section>
  );
}

export default App;
