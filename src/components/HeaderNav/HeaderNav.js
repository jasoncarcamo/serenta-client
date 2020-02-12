import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderNav.css";

export default class HeaderNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    };

    toLogin = ()=>{
        this.props.history.push("/login")
    }

    toRegister = ()=>{
        this.props.history.push("/post-ad/register");
    };

    render(){
        return (
            <header id="nav-header">
                <nav id="nav-container">
                    <button onClick={this.toLogin}>Log In</button>
                    <button onClick={this.toRegister}>Post Ad</button>
                </nav>
            </header>
        );
    };
};