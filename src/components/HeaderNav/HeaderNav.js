import React from "react";
import "./HeaderNav.css";
import TokenService from "../../Services/TokenService";
import ReactLoading from "react-loading";

export default class HeaderNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    };

    componentDidMount(){
        this.disableScroll();
    };

    disableScroll = ()=>{
        const navHeader = document.getElementById("nav-header");
        
        navHeader.addEventListener("touchmove", (e)=>{
            e.preventDefault();
            console.log("Scrolling")
        })
    }

    disableNavMenu = ()=>{
        const menu = document.getElementById("nav-header");
        
        menu.classList.remove("display-header");
        menu.classList.add("close-header");
    }

    toHome = ()=>{
        this.props.history.push("/");
        this.disableNavMenu();
    }

    toLogin = ()=>{
        this.props.history.push("/login");
        this.disableNavMenu();
    }

    toAdRegister = ()=>{
        this.props.history.push("/post-ad/register");
        this.disableNavMenu();
    };

    notSignedIn = ()=>{
        return (
            <>
                <button onClick={this.toLogin}>Log In</button>
                <button onClick={this.toAdRegister}>Post Ad</button>
            </> 
        );
    };

    toAccount = ()=>{
        this.props.history.push("/user");
        this.disableNavMenu();
    };

    toPostAd = ()=>{
        this.props.history.push("/post-ad");
        this.disableNavMenu();
    };

    signedIn = ()=>{
        return (
            <>
                <button onClick={this.toAccount}>Account</button>
                <button onClick={this.toPostAd}>Post Ad</button>
            </>
        )
    }

    handleSignOut = ()=>{
        TokenService.deleteToken();
        this.props.history.push("/");
        this.disableNavMenu();
    }

    render(){
        return (
            <header id="nav-header">
                <nav id="nav-container">
                    
                    <p 
                        id="close-menu"
                        onClick={this.disableNavMenu}>X</p>

                    <button id="home-button" onClick={this.toHome}>Home</button>

                    {TokenService.hasToken() ? this.signedIn() : this.notSignedIn()}
                    
                    {TokenService.hasToken() ? <button id="log-out-button2" onClick={this.handleSignOut}>Log out</button> : ""}
                </nav>
            </header>
        );
    };
};