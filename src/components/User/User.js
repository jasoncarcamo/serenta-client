import React from "react";
import TokenService from "../../Services/TokenService";
import {Route} from "react-router-dom";
import UserHeader from "./UserHeader/UserHeader";
import "./User.css";
import UserContext from "../../Contexts/UserContext/UserContext";
import AdsContainer from "./AdsContianer/AdsContainer";

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ads: [],
            error: ""
        }
    }

    static contextType = UserContext;
    
    componentDidMount(){

    }

    render(){
        console.log(this.state.ads, this.context.ads)
        return (
            <section id="user-section">

                <Route path="/user" component={UserHeader}></Route>

                <h2>Your dashboard</h2>

                <AdsContainer ads={this.context.ads}/>
                
            </section>
        )
    }
}