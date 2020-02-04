import React from "react";
import "./SearchBox.css";
import PlacesAutoComplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

export default class SearchBox extends React.Component{
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
                    {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                    })}
                    />

                    <div className="autocomplete-dropdown-container">

                    {loading && <div>Loading...</div>}

                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };

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

                <button
                    onClick={this.cick}
                    style={{
                        width: "3.7em", 
                        height: "3.7em",
                        position: "relative",
                        top: ".2em",
                        right: "4.4em",
                        padding: 0,
                        margin: 0,
                        borderRadius: "100%",
                        border: "none"
                    }}
                >Find</button>
            </form>
        );
    };
};