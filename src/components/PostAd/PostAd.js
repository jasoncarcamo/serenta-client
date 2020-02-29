import React from "react";
import TokenService from "../../Services/TokenService";
import SpacesContext from "../../Contexts/SpacesContext/SpacesContext";
import "./PostAd.css";

export default class PostAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: "",
            apartment_location: "",
            city: "",
            state: "",
            zip_code: "",            
            mobile_number: "",
            space_type: "Bedroom",
            room_amount: "1 room",
            bathroom_amount: "1 bathroom",
            pets: "No pets",
            price: "",
            includes: "",
            special_comments: "",
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

    handleMobileNumber = (e)=>{
        this.setState({
            mobile_number: e.target.value
        })
    }

    handleIncludes = (e)=>{
        this.setState({
            includes: e.target.value
        });
    }

    handleSpecialComments = (e)=>{
        this.setState({
            special_comments: e.target.value
        });
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
                        mobile_number: this.state.mobile_number,
                        space_type: this.state.space_type,
                        room_amount: this.state.room_amount,
                        bathroom_amount: this.state.bathroom_amount,
                        pets: this.state.pets,
                        price: this.state.price,
                        lat: locationData.results[0].geometry.location.lat,
                        lng: locationData.results[0].geometry.location.lng,
                        includes: this.state.includes,
                        special_comments: this.state.special_comments
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
            <section id="post-ad-section">
                <form id="post-ad-form" onSubmit={this.handleSubmit}>
                    <fieldset id="post-ad-fieldset">

                        <label htmlFor="post-ad-address">
                            Address: <input 
                            id="post-ad-address" 
                            type="text"
                            value={this.state.address} 
                            onChange={this.handleAddress}
                            required></input>
                        </label>
                        

                        <label htmlFor="post-ad-apartment">
                            Apartment location: if applicable <input 
                            id="post-ad-apartment" 
                            type="text" 
                            placeholder="E.g. A12"
                            value={this.state.apartment_location} 
                            onChange={this.handleApartmentLocation}></input>
                        </label>
                        

                        <label htmlFor="post-ad-city">
                            City: <input 
                            id="post-ad-city" 
                            type="text"
                            value={this.state.city} 
                            onChange={this.handleCity}
                            required/>
                        </label>
                        

                        <label htmlFor="post-ad-state">
                            State: <input 
                            id="post-ad-state" 
                            type="text"
                            value={this.state.state} 
                            onChange={this.handleState}
                            required></input>
                        </label>
                        

                        <label htmlFor="post-ad-zipcode">
                            Zip code: <input 
                            id="post-ad-zipcode" 
                            type="text"
                            value={this.state.zip_code} 
                            onChange={this.handleZipcode}
                            required></input>
                        </label>
                    

                        <label htmlFor="register-ad-type">
                            Living space type: <select 
                            id="register-ad-type" 
                            value={this.state.space_type} 
                            onChange={this.handleSpaceType}>
                                <option value="Bedroom">Bed Room</option>
                                <option value="Apartment">Apartment</option>
                            </select>
                        </label>

                        <label htmlFor="register-ad-rooms">
                            Number of rooms: <select 
                            id="register-ad-rooms" 
                            value={this.state.room_amount} 
                            onChange={this.handleRoomAmount}>
                                <option value="1 room">1</option>
                                <option value="2 rooms">2</option>
                                <option value="3 rooms">3</option>
                                <option value="4 rooms">3</option>
                            </select>
                        </label>
                        

                        <label htmlFor="register-ad-bathrooms">
                            Number of bathrooms: <select 
                            id="register-ad-bathrooms" 
                            value={this.state.bathroom_amount} 
                            onChange={this.handleBathroomAmount}>
                                <option value="1 bathroom">1</option>
                                <option value="2 bathrooms">2</option>
                                <option value="3 bathrooms">3</option>
                                <option value="4 bathrooms">4</option>
                            </select>
                        </label>

                        <label htmlFor="register-ad-pets">
                            Pets: <select 
                            id="register-ad-pets" 
                            value={this.state.pets} 
                            onChange={this.handlePets}>
                                <option value="No pets">No pets</option>
                                <option value="Dogs ok">Dogs ok</option>
                                <option value="Cats ok">Cats ok</option>
                                <option value="Dogs and Cats ok">Dogs and Cats ok</option>
                            </select>
                        </label>

                        <label htmlFor="register-ad-price">
                            Price: <input 
                            id="register-ad-price" 
                            type="number"
                            value={this.state.price} 
                            onChange={this.handlePrice}
                            placeholder="How much monthly?"
                            required></input>
                        </label>
                        

                        <label htmlFor="register-ad-mobile-number">
                            Confirm mobile number: <input 
                            id="register-ad-mobile-number"
                            type="text"
                            value={this.state.mobile_number}
                            onChange={this.handleMobileNumber}
                            required
                            />
                        </label>

                        <label htmlFor="register-ad-images">
                            Images: <input 
                            id="register-ad-images" 
                            type="file"
                            multiple></input>
                        </label>

                        <label 
                            htmlFor="register-ad-includes">includes:</label>
                        <textarea value={this.state.includes} onChange={this.handleIncludes}/>

                        <label 
                            htmlFor="register-ad--special-comments">Comments:</label>
                        <textarea value={this.state.special_comments} onChange={this.handleSpecialComments}/>


                        {this.state.error ? <p>{this.state.error}</p> : ""}

                        <button type="submit">Post Ad</button>
                    </fieldset>
                </form>
            </section>
        );
    };
};