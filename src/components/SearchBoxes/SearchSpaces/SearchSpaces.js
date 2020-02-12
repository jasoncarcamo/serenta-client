import React from "react";
import "./SearchSpaces.css";
import PlacesAutoComplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import dotenv from "dotenv";

dotenv.config();

export default class SearchSpaces extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: "",
            lat: "",
            long: ""
        }
    };

    componentDidMount(){
    }

    success = (position)=>{
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        console.log( lat, long);
        this.setState({
            lat,
            long
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
          }
    }

    handleAddress = (address)=>{
        console.log(address)
        this.setState({ address })
    }

    handleSelect = (address)=>{
        console.log(address)
        this.setState({ address })
    }

    handleSearch = ()=>{
        console.log(process.env.REACT_APP_API_KEY)
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=11+rodney+place,+amityville,+ny&key=AIzaSyAAPqYeOSuJKs63H8A4NwaKp8fjVZo_jao`)
            .then( res => {
                if(!res.ok){
                    res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData)
            })
            .catch( err => { console.log(err)})
    }

    render(){
        return (
            <form
            onSubmit={(e)=>{ e.preventDefault()}}
                id="search-location">
                
                <PlacesAutoComplete
                    value={this.state.address}
                    onChange={this.handleAddress}
                    onSelect={this.handleSelect}>
                    
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                    value={this.state.address}
                    {...getInputProps({
                        placeholder: 'Search areas near you ...',
                        className: 'location-search-input',
                    })}
                    />

                    <button
                        onClick={this.handleSearch}
                    >Find spaces</button>

                    <div className="autocomplete-dropdown-container">

                    {loading && <div>Loading...</div>}

                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: 'lightgray', cursor: 'pointer', margin: "1em 0", padding: "1em 1em"}
                        : { backgroundColor: '#ffffff', cursor: 'pointer', margin: "1em 0", padding: "1em 1em"};

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