import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderNav.css";

export default class HeaderNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    };

    toRegister = ()=>{
        this.props.history.push("/post-ad/register");
    };

    render(){
        return (
            <header id="nav-header">
                <nav id="nav-container">
                    <NavLink to="/login" className="nav-link">Log In</NavLink>
                    <button onClick={this.toRegister}>Post Ad</button>
                </nav>
            </header>
        );
    };
};