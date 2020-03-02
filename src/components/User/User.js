import React from "react";
import TokenService from "../../Services/TokenService";

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ads: [],
            error: ""
        }
    }

    componentDidMount(){
        
    }

    render(){
        return (
            <section id="user-section>">
                <h2>Your dashboard</h2>
            </section>
        )
    }
}