import React from "react";
import "./SearchSpaces.css";
import PlacesAutoComplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import dotenv from "dotenv";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

dotenv.config();

export default class SearchSpaces extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: "",
            lat: "",
            lng: ""
        }
    };

    componentDidMount(){
        document.getElementById("nav-burger").addEventListener("click", (e)=>{
            document.getElementById("nav-header").classList.add("display-header");
            document.getElementById("nav-header").classList.remove("close-header")
        })
    }

    success = (position)=>{
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        
        this.setState({
            lat,
            lng
        });
    };

    error = (error)=>{
        console.log("Error")
    }

    cick = (e)=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.success, this.Error);
        } else { 
        console.log("Geolocation is not supported by this browser.");
        };
    }

    handleAddress = (address)=>{
        this.setState({ address });
    }

    handleSelect = (address)=>{
        this.setState({ address });
        this.autoSearch(address);
    };
    
    autoSearch = (selectedAddress)=>{
        let commasAmount = 0;
        let zoom = 13;
        let address = selectedAddress.toLowerCase();

        address = address.split(" ");

        for( let i = 0; i < address.length; i++){
            
            if(address[i].substring( address[i].length - 1) === ","){

                commasAmount++;

            };

        };

        if(commasAmount == 0){
            zoom = 4;
        };

        if(commasAmount == 1){
            zoom = 8
        };

        if( commasAmount >= 2){
            zoom = 14;
        };

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAAPqYeOSuJKs63H8A4NwaKp8fjVZo_jao`)
            .then( res => {
                if(!res.ok){
                    res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {

                this.props.searchArea(resData.results[0].geometry.location.lat, resData.results[0].geometry.location.lng, zoom);

            })
            .catch( err => { console.log(err)})
    }

    handleSearch = (e)=>{

        e.preventDefault();

        let commasAmount = 0;
        let zoom = 13;
        let address = this.state.address.toLowerCase();

        address = address.split(" ");

        for( let i = 0; i < address.length; i++){
            
            if(address[i].substring( address[i].length - 1) === ","){

                commasAmount++;

            };

        };

        if(commasAmount == 0){
            zoom = 4;
        };

        if(commasAmount == 1){
            zoom = 8
        };

        if( commasAmount >= 2){
            zoom = 14;
        };

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAAPqYeOSuJKs63H8A4NwaKp8fjVZo_jao`)
            .then( res => {
                if(!res.ok){
                    res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {

                this.props.searchArea(resData.results[0].geometry.location.lat, resData.results[0].geometry.location.lng, zoom);

            })
            .catch( err => { console.log(err)})
    }

    render(){
        return (
            <form
            onSubmit={this.handleSearch}
                id="search-location">

                
                
                <PlacesAutoComplete
                    value={this.state.address}
                    onChange={this.handleAddress}
                    onSelect={this.handleSelect}>
                    
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>

                    <button id="nav-burger" className="hamburger hamburger--collapse" type="button">
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>

                    <input
                    {...getInputProps({
                        placeholder: 'Search areas near you ...',
                        className: 'location-search-input',
                    })}
                    required
                    />


                    <FontAwesomeIcon id="search-spaces-input" icon={faSearch}/>

                    <div className="autocomplete-dropdown-container">

                    {loading && <div>Loading...</div>}

                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: 'lightgray', cursor: 'pointer', margin: "0", padding: ".9em 1em"}
                        : { backgroundColor: '#ffffff', cursor: 'pointer', margin: "0", padding: ".9em 1em"};

                        return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                        );

                    })}
                    </div>
                </div>
        )}

                </PlacesAutoComplete>

            </form>
        );
    };
};