import React from "react";
import GoogleMap from "google-map-react";
import {Route} from "react-router-dom";
import Marker from "./Marker";

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
        console.log(this.props)
    }

    

    success = (position)=>{
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

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
        };
    }

    change = ({ center, zoom}) => {

        center = {
            lat: this.state.lat,
            lng: this.state.l0ng
        }
    }

    render(){
        console.log(this.props)
        return (
            
            <GoogleMap
                className="map"
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_API_KEY,
                    language: "en",
                    region: "US"
                }}
                
                onChange={this.change}
                yesIWantToUseGoogleMapApiInternals
                zoom={this.props.zoom}
                center={this.props.center}
                style={{
                    flex: 1
                }}
                options={
                    {
                        fullscreenControl: false,
                        mapTypeControl: false,
                        mapTypeId: "hybrid"                    
                    }
                }
                resetBoundsOnResize={false}
            >
                <Marker lat={this.props.center.lat} lng={this.props.center.lng}/>
                <Marker lat={40.6845436} lng={-73.4098946}/>
                <Marker lat={40.6686041} lng={-73.4094001}/>
            </GoogleMap>            
        );
    };
};