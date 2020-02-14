import React from "react";

export default class PostAd extends React.Component{
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

                        <label htmlFor="register-ad-first-name">Living space type:</label>

                        <select id="register-ad-first-name" >
                            <option value="Bedroom">Bed Room</option>
                            <option value="Apartment">Apartment</option>
                        </select>

                        <label htmlFor="register-ad-last-name">Number of rooms:</label>

                        <select id="register-ad-last-name" type="text">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={3}>3</option>
                        </select>

                        <label htmlFor="register-ad-email">Number of bathrooms:</label>
                        <select id="register-ad-last-name" type="email">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>

                        <label htmlFor="register-ad-mobile-number">Pets:</label>
                        <select id="register-ad-mobile-number" type="text">
                            <option value="No pets">No pets</option>
                            <option value="Dogs ok">Dogs ok</option>
                            <option value="Cats ok">Cats ok</option>
                            <option value="Dogs and Cats ok">Dogs and Cats ok</option>
                        </select>

                        <label htmlFor="register-ad-password">Password</label>
                        <input id="register-ad-password" type="range" defaultValue={1000} min={0} max={10000}></input>

                        <label htmlFor="register-ad-confirm-password">Images</label>
                        <input id="register-ad-confirm-password" type="file"></input>

                        <button type="submit">Post Ad</button>
                    </fieldset>
                </form>
            </section>
        );
    };
};