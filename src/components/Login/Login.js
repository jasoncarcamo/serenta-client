import React from "react";

export default class Login extends React.Component{
    render(){
        return (
            <section>
                <form>
                    <fieldset>

                        <legend>
                            <h2>Log in to your account</h2>
                        </legend>

                        <label htmlFor="login-email">Email:</label>
                        <input id="login-email" type="email"></input>

                        <label htmlFor="login-password">Password:</label>
                        <input id="login-password" type="password"></input>

                        <button type="submit">Log In</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}