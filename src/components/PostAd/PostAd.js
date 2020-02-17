import React from "react";
import TokenService from "../../Services/TokenService";
import SpacesContext from "../../Contexts/SpacesContext/SpacesContext";

export default class PostAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: "",
            apartment_location: "",
            city: "",
            state: "",
            zip_code: "",
            space_type: "Bedroom",
            room_amount: 1,
            bathroom_amount: 1,
            pets: "No pets",
            price: "",
            error: ""
        };
    };

    static contextType = SpacesContext;

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

    getAddress = ()=>{
        let address = this.state.address + ", " + this.state.city + ", " + this.state.state + ", " + this.state.zip_code
        
        address = address.split(" ").join("+");

        return address;
    }

    handleSubmit = (e)=>{
        e.preventDefault();

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.getAddress()}&key=${process.env.REACT_APP_API_KEY}`)
            .then( locationRes => {
                if(!locationRes.ok){
                    locationRes.json().then( e => Promise.reject(e));
                };

                return locationRes.json();
            })
            .then( locationData => {            

                fetch(`http://localhost:8000/api/living-space`, {
                    method: "POST",
                    headers: {
                        'content-type': "application/json",
                        "authorization": `bearer ${TokenService.getToken()}`
                    },
                    body: JSON.stringify({
                        address: this.state.address,
                        city: this.state.city,
                        state: this.state.state,
                        zip_code: this.state.zip_code,
                        space_type: this.state.space_type,
                        room_amount: this.state.room_amount,
                        bathroom_amount: this.state.bathroom_amount,
                        pets: this.state.pets,
                        price: this.state.price,
                        lat: locationData.results[0].geometry.location.lat,
                        lng: locationData.results[0].geometry.location.lng
                    })
                })
                    .then( adsRes => {

                        if(!adsRes.ok){
                            return adsRes.json().then ( e => Promise.reject(e));
                        };

                        return adsRes.json();
                    })
                    .then( adsData =>{
                        
                        this.setState({ error: "Success"});
                        this.context.refresh();
                        this.props.history.push("/");
                    })
                    .catch( adsErr => this.setState({ error: adsErr.error }))

            })
            .catch( locationErr => { this.setState({ error: locationErr.error })})
    }

    render(){
        
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>

                        <label htmlFor="post-ad-address">Address</label>
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
                            type="text"
                            value={this.state.price} 
                            onChange={this.handlePrice}></input>

                        <label htmlFor="register-ad-images">Images</label>
                        <input 
                            id="register-ad-images" 
                            type="file"></input>

                        {this.state.error ? <p>{this.state.error}</p> : ""}

                        <button type="submit">Post Ad</button>
                    </fieldset>
                </form>
            </section>
        );
    };
};