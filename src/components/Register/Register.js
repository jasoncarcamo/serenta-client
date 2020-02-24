import React from "react";
import TokenService from "../../Services/TokenService";

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            mobile_number: "",
            password: "",
            confirmPassword: "",
            error: ""
        };
    };

    handleFirstName = (e)=>{
        this.setState({
            first_name: e.target.value
        })
    }

    handleLastName = (e)=>{
        this.setState({
            last_name: e.target.value
        })
    }

    handleEmail = (e)=>{
        this.setState({
            email: e.target.value
        })
    }

    handleMobileNumber = (e)=>{
        this.setState({
            mobile_number: e.target.value
        })
    }

    handlePassword = (e)=>{
        this.setState({
            password: e.target.value
        })
    }

    handleConfrimPassword = (e)=>{
        this.setState({
            confirmPassword: e.target.value
        })
    }

    handleForm = (e)=>{
        e.preventDefault();

        fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                mobile_number: this.state.mobile_number,
                password: this.state.password
            })
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                TokenService.saveToken(resData.token);
                this.props.history.push("/");
            })
            .catch( err => this.setState({ error: err.error}))
    }

    render(){

        return (
            <section>
                <form onSubmit={this.handleForm}>
                    <fieldset>

                        <label htmlFor="register-first-name">First name</label>
                        <input 
                            id="register-first-name" 
                            type="text"
                            value={this.state.first_name}
                            onChange={this.handleFirstName}></input>

                        <label htmlFor="register-last-name">Last name</label>
                        <input 
                            id="register-last-name" 
                            type="text"
                            value={this.state.last_name}
                            onChange={this.handleLastName}></input>

                        <label htmlFor="register-email">Email</label>
                        <input 
                            id="register-email" 
                            type="email"
                            value={this.state.email}
                            onChange={this.handleEmail}></input>

                        <label htmlFor="register-mobile-number">Mobile number</label>
                        <input 
                            id="register-mobile-number" 
                            type="text"
                            value={this.state.mobile_number}
                            onChange={this.handleMobileNumber}></input>

                        <label htmlFor="register-password">Password</label>
                        <input 
                            id="register-password" 
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePassword}></input>

                        <label htmlFor="register-confirm-password">Retype password</label>
                        <input 
                            id="register-confirm-password" 
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={this.handleConfrimPassword}></input>
                        
                        {this.state.error ? <p>{this.state.error}</p> : ""}

                        <button type="submit">Register</button>
                    </fieldset>
                </form>
            </section>
        );
    };
};