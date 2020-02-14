import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderNav.css";
import TokenService from "../../Services/TokenService";

export default class HeaderNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    };

    toLogin = ()=>{
        this.props.history.push("/login")
    }

    toAdRegister = ()=>{
        this.props.history.push("/post-ad/register");
    };

    notSignedIn = ()=>{
        return (
            <nav id="nav-container">
                <button onClick={this.toLogin}>Log In</button>
                <button onClick={this.toAdRegister}>Post Ad</button>
            </nav> 
        );
    };

    toAccount = ()=>{
        this.props.history.push("/user");
    };

    toPostAd = ()=>{
        this.props.history.push("/post-ad");
    };

    signedIn = ()=>{
        return (
            <nav id="nav-container">
                <button onClick={this.toAccount}>Account</button>
                <button onClick={this.toPostAd}>Post Ad</button>
            </nav>
        )
    }

    render(){
        return (
            <header id="nav-header">
                {TokenService.hasToken() ? this.signedIn() : this.notSignedIn()}
            </header>
        );
    };
};