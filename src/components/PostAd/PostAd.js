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

                        <label htlFor="post-ad-address">Address</label>
                        <input id="post-ad-address" type="text"></input>

                        <label htmlFor="post-ad-apartment">Apartment location: if applicable</label>
                        <input id="post-ad-apartment" type="text" placeholder="E.g. A12"></input>

                        <label htmlFor="post-ad-city">City:</label>
                        <input id="post-ad-city" type="text"/>

                        <label htmlFor="post-ad-state">State:</label>
                        <input id="post-ad-state" type="text"></input>

                        <label htmlFor="post-ad-zipcode">Zip code:</label>
                        <input id="post-ad-zipcode" type="text"></input>

                        <label htmlFor="register-ad-type">Living space type:</label>

                        <select id="register-ad-type" >
                            <option value="Bedroom">Bed Room</option>
                            <option value="Apartment">Apartment</option>
                        </select>

                        <label htmlFor="register-ad-rooms">Number of rooms:</label>

                        <select id="register-ad-rooms" type="text">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={3}>3</option>
                        </select>

                        <label htmlFor="register-ad-bathrooms">Number of bathrooms:</label>
                        <select id="register-ad-bathrooms" type="email">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>

                        <label htmlFor="register-ad-pets">Pets:</label>
                        <select id="register-ad-pets" type="text">
                            <option value="No pets">No pets</option>
                            <option value="Dogs ok">Dogs ok</option>
                            <option value="Cats ok">Cats ok</option>
                            <option value="Dogs and Cats ok">Dogs and Cats ok</option>
                        </select>

                        <label htmlFor="register-ad-price">Price</label>
                        <input id="register-ad-price" type="range" defaultValue={1000} min={0} max={10000}></input>

                        <label htmlFor="register-ad-images">Images</label>
                        <input id="register-ad-images" type="file"></input>

                        <button type="submit">Post Ad</button>
                    </fieldset>
                </form>
            </section>
        );
    };
};