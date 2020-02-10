import React from "react";

export default class PostAdRegister extends React.Component{
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

                        <label htmlFor="register-ad-first-name">First name</label>
                        <input id="register-ad-first-name" type="text"></input>

                        <label htmlFor="register-ad-last-name">Last name</label>
                        <input id="register-ad-last-name" type="text"></input>

                        <label htmlFor="register-ad-email">Email</label>
                        <input id="register-ad-last-name" type="email"></input>

                        <label htmlFor="register-ad-mobile-number">Mobile number</label>
                        <input id="register-ad-mobile-number" type="text"></input>

                        <label htmlFor="register-ad-password">Password</label>
                        <input id="register-ad-password" type="password"></input>

                        <label htmlFor="register-ad-confirm-password">Retype password</label>
                        <input id="register-ad-confirm-password" type="password"></input>

                        <button type="submit">Post Ad</button>
                    </fieldset>
                </form>
            </section>
        );
    };
};