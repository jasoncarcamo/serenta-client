import React from "react";
import TokenService from "../../Services/TokenService";
import "./Login.css";
import {Link} from "react-router-dom";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    };

    handleEmail = (e)=>{
        this.setState({ email: e.target.value });
    }

    handlePassword = (e)=>{
        this.setState({ password: e.target.value });
    }

    handleSubmit = (e)=>{
        e.preventDefault();

        fetch(`http://localhost:8000/api/login`, {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e=> Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                
                TokenService.saveToken(resData.token);
                this.props.history.push("/user");
            })
            .catch( err => { this.setState({ error: err.error })});
    };

    render(){
        return (
            <section id="login-section">
                <form id="login-form" onSubmit={this.handleSubmit}>
                    <fieldset id="login-fieldset">

                        <legend>
                            <p>Not registered? Log in <Link to="/register">here</Link></p>
                        </legend>

                        <label htmlFor="login-email">Email:</label>
                        <input 
                            id="login-email" 
                            type="email"
                            value={this.state.email}
                            onChange={this.handleEmail}
                        ></input>

                        <label htmlFor="login-password">Password:</label>
                        <input 
                            id="login-password" type="password"
                            value={this.state.password}
                            onChange={this.handlePassword}
                        ></input>

                        {this.state.error ? <p>{this.state.error}</p> : ""}

                        <button id="login-submit" type="submit">Log In</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}