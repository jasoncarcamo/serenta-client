import React from "react";
import "./MenuBurger.css";

export default class MenuBurger extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    };

    componentDidMount(){
    }

    disableNavMenu = ()=>{
        const menu = document.getElementById("nav-header");
        
        menu.classList.add("display-header");
        menu.classList.remove("close-header");
    }

    render(){
        return (
            <button 
                id="nav-menu" 
                className="hamburger hamburger--collapse" 
                type="button"
                onClick={this.disableNavMenu}>
                <div></div>
                <div></div>
                <div></div>
            </button>
        );
    };
};