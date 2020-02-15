import React from "react";

export default class PostAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: "",
            apartment_location: "",
            city: "",
            state: "",
            zip_code: "",
            space_type: "",
            room_amount: "",
            bathroom_amount: "",
            pets: "",
            price: "",
            error: ""
        };
    };

    handleAddress = (e)=>{
        this.setState({ address: e.target.value});
    }

    handleApartmentLocation = (e)=>{
        this.setState({ apartment_location: e.target.value});
    }

    handleCity = (e)=>{
        this.setState({ city: e.target.value});
    }

    handleState = (e)=>{
        this.setState({ state: e.target.value});
    }

    handleZipcode = (e)=>{
        this.setState({ zip_code: e.target.value});
    }

    handleSpaceType = (e)=>{
        this.setState({ space_type: e.target.value});
    }

    handleRoomAmount = (e)=>{
        this.setState({ room_amount: e.target.value});
    }

    handleBathroomAmount = (e)=>{
        this.setState({ bathroom_amount: e.target.value});
    }

    handlePets = (e)=>{
        this.setState({ pets: e.target.value});
    }

    handlePrice = (e)=>{
        this.setState({ price: e.target.value});
    }

    render(){

        return (
            <section>
                <form>
                    <fieldset>

                        <label htlFor="post-ad-address">Address</label>
                        <input 
                            id="post-ad-address" 
                            type="text"
                            value={this.state.address} 
                            onChange={this.handleAddress}></input>

                        <label htmlFor="post-ad-apartment">Apartment location: if applicable</label>
                        <input 
                            id="post-ad-apartment" 
                            type="text" 
                            placeholder="E.g. A12"
                            value={this.state.apartment_location} 
                            onChange={this.handleApartmentLocation}></input>

                        <label htmlFor="post-ad-city">City:</label>
                        <input 
                            id="post-ad-city" 
                            type="text"
                            value={this.state.city} 
                            onChange={this.handleCity}/>

                        <label htmlFor="post-ad-state">State:</label>
                        <input 
                            id="post-ad-state" 
                            type="text"
                            value={this.state.state} 
                            onChange={this.handleState}></input>

                        <label htmlFor="post-ad-zipcode">Zip code:</label>
                        <input 
                            id="post-ad-zipcode" 
                            type="text"
                            value={this.state.zip_code} 
                            onChange={this.handleZipcode}></input>

                        <label htmlFor="register-ad-type">Living space type:</label>

                        <select 
                            id="register-ad-type" 
                            value={this.state.space_type} 
                            onChange={this.handleSpaceType}>
                            <option value="Bedroom">Bed Room</option>
                            <option value="Apartment">Apartment</option>
                        </select>

                        <label htmlFor="register-ad-rooms">Number of rooms:</label>
                        <select 
                            id="register-ad-rooms" 
                            value={this.state.room_amount} 
                            onChange={this.handleRoomAmount}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={3}>3</option>
                        </select>

                        <label htmlFor="register-ad-bathrooms">Number of bathrooms:</label>
                        <select 
                            id="register-ad-bathrooms" 
                            value={this.state.bathroom_amount} 
                            onChange={this.handleBathroomAmount}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>

                        <label htmlFor="register-ad-pets">Pets:</label>
                        <select 
                            id="register-ad-pets" 
                            value={this.state.pets} 
                            onChange={this.handlePets}>
                            <option value="No pets">No pets</option>
                            <option value="Dogs ok">Dogs ok</option>
                            <option value="Cats ok">Cats ok</option>
                            <option value="Dogs and Cats ok">Dogs and Cats ok</option>
                        </select>

                        <label htmlFor="register-ad-price">Price</label>
                        <input 
                            id="register-ad-price" 
                            type="range" 
                            defaultValue={1000} 
                            min={0} 
                            max={10000}
                            value={this.state.price} 
                            onChange={this.handlePrice}></input>

                        <label htmlFor="register-ad-images">Images</label>
                        <input 
                            id="register-ad-images" 
                            type="file"></input>

                        <button type="submit">Post Ad</button>
                    </fieldset>
                </form>
            </section>
        );
    };
};