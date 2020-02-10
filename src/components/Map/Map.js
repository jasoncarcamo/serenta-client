import React from "react";
import GoogleMap from "google-map-react";
import {Route} from "react-router-dom";

export default class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lat: "",
            long: ""
        };
    };

    componentDidMount(){
        this.cick();
        
    }

    success = (position)=>{
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        console.log( lat, long, position.coords.accuracy);

        this.setState({
            lat,
            long
        });

    };

    error = (error)=>{
        console.log("Error")
    }

    cick = ()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.success, this.Error);
          } else { 
            console.log("Geolocation is not supported by this browser. ");
          }
    }

    render(){
        return (
            
            <GoogleMap
                className="map"
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_API_KEY,
                    language: "en",
                    region: "US"
                }}
                style={{
                    position: "absolute",
                    zIndex: 0,
                    width: "100vw", 
                    height: "100vh"
                }}
                zoom={13}
                center={{
                    lat: this.state.lat || 0,
                    lng: this.state.long || 0
                    }}
                    options={
                        {
                            fullscreenControl: false,
                            mapTypeControl: true,
                            mapTypeId: "hybrid"
                        }
                    }>
            </GoogleMap>            
        );
    };
};