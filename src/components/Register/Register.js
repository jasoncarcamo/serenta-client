import React from "react";
import TokenService from "../../Services/TokenService";
import "./Register.css";

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

    handleConfirmPassword = (e)=>{
        this.setState({
            confirmPassword: e.target.value
        })
    }

    passwordMatch = ()=>{
        const div = document.getElementById("password-matches");
        console.log(div)
        if(this.state.password === this.state.confirmPassword){
            div.style.backgroundColor = "green"
            return <p>Great! Your password matches</p>
        } else{
            div.style.backgroundColor = "red"
            return <p>Your passwords do not match</p>
        }
        
    };

    validatePassword = (password) => {
        
        const REGEX_UPPER_LOWER_NUMBER_SPECIAL = (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/);

        const requirements = [ 
            <span key={0} className="reg_error" style={{color: 'gray'}}>Password must be longer than 8 characters</span>,
            <span key={1} className="reg_error" style={{color: 'gray'}}>Password must be less than 72 characters</span>,
            <span key={2} className="reg_error" style={{color: 'gray'}}>Password must not start or end with empty spaces</span>,
            <span key={3} className="reg_error" style={{color: 'gray'}}>Password must contain one upper case, lower case, number and special character</span>
        ]

        if(password.length > 1){
            if (password.length > 8) {
                requirements[0] = <span key={0} className="reg_error" style={{color: 'green'}}>Password must be longer than 8 characters</span>
              } else{
      
              }
      
              if (password.length < 72) {
                requirements[1] = <span key={1} className="reg_error" style={{color: 'green'}}>Password must be less than 72 characters</span>
              } else{
      
              };
      
              if (!password.startsWith(' ') || !password.endsWith(' ')) {
                requirements[2] = <span key={2} className="reg_error" style={{color: 'green'}}>Password must not start or end with empty spaces</span>
              } else{
                
              };
      
              if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
                  requirements[3] = <span key={3} className="reg_error" style={{color: 'gray'}}>Password must contain one upper case, lower case, number and special character</span>
              } else{
                  requirements[3] = <span key={3} className="reg_error" style={{color: 'green'}}>Password must contain one upper case, lower case, number and special character</span>
              };
        }
        
        return requirements
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

                        <div id="password-confirm-box">
                            {this.validatePassword(this.state.password)}
                        </div>

                        <label htmlFor="register-confirm-password">Retype password</label>
                        <input 
                            id="register-confirm-password" 
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={this.handleConfirmPassword}></input>
                        
                        <div id="password-matches">kk</div>
                        {this.state.password && this.state.confirmPassword ? this.passwordMatch() : ""}
                        
                        {this.state.error ? <p>{this.state.error}</p> : ""}

                        <button type="submit">Register</button>
                    </fieldset>
                </form>
            </section>
        );
    };
};