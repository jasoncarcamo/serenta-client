import React from "react";
import "./LoadingScreen.css";

export default class LoadingScreen extends React.Component{
    render(){
        return (
            <section id="loading-screen">
                <h2>Welcome to Serenta</h2>

                <div class="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

            </section>
        )
    }
}