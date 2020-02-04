import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderNav.css";

export default class HeaderNav extends React.Component{
    render(){
        return (
            <header id="nav-header">
                <nav id="nav-container">
                    <NavLink to="/" className="nav-link">Log In</NavLink>
                    <button>Post Ad</button>
                </nav>
            </header>
        );
    };
};