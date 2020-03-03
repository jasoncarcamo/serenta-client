import React from "react";
import "./UserHeader.css";

export default class UserHeader extends React.Component{

    toPostAd = ()=>{
        this.props.history.push("/post-ad")
    };
    
    render(){
        return (
            <section id="user-header">
                <button 
                    onClick={this.toPostAd}>
                    Post an ad
                </button>
            </section>
        )
    }
}