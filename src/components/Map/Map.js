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
        
    }

    componentWillReceiveProps(){
        
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
            lng: this.state.lng
        }
    }

    renderAds = ()=>{
        let ads = this.props.ads;

        ads = ads.map( ( ad, index) => {
            
            return <Marker key={index} ad={ad} lat={ad.lat} lng={ad.lng}/>
        });

        return ads;
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
                
                onChange={this.change}
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
                {this.renderAds()}
                
            </GoogleMap>            
        );
    };
};