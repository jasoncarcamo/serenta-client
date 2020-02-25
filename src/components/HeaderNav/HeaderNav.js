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

    componentDidMount(){
        document.getElementById("close-menu").addEventListener("click", (e)=>{
            document.getElementById("nav-header").classList.remove("display-header");
            document.getElementById("nav-header").classList.add("close-header")
        })
    }

    toLogin = ()=>{
        this.props.history.push("/login")
    }

    toAdRegister = ()=>{
        this.props.history.push("/post-ad/register");
    };

    notSignedIn = ()=>{
        return (
            <div>
                <button onClick={this.toLogin}>Log In</button>
                <button onClick={this.toAdRegister}>Post Ad</button>
            </div> 
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
            <div>
                <button onClick={this.toAccount}>Account</button>
                <button onClick={this.toPostAd}>Post Ad</button>
            </div>
        )
    }

    render(){
        return (
            <header id="nav-header">
                <nav id="nav-container">
                    
                    <p id="close-menu">X</p>

                    {TokenService.hasToken() ? this.signedIn() : this.notSignedIn()}

                </nav>
            </header>
        );
    };
};