import React from "react";

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            mobile_number: "",
            password: "",
            error: ""
        };
    };

    render(){

        return (
            <section>
                <form>
                    <fieldset>

                        <label htmlFor="register-first-name">First name</label>
                        <input id="register-first-name" type="text"></input>

                        <label htmlFor="register-last-name">Last name</label>
                        <input id="register-last-name" type="text"></input>

                        <label htmlFor="register-email">Email</label>
                        <input id="register-email" type="email"></input>

                        <label htmlFor="register-mobile-number">Mobile number</label>
                        <input id="register-mobile-number" type="text"></input>

                        <label htmlFor="register-password">Password</label>
                        <input id="register-password" type="password"></input>

                        <label htmlFor="register-confirm-password">Retype password</label>
                        <input id="register-confirm-password" type="password"></input>

                        <button type="submit"></button>
                    </fieldset>
                </form>
            </section>
        );
    };
};