import React from "react";
import GoogleMap from "google-map-react";
import {Route} from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";

export default class Map extends React.Component{
    render(){
        return (
            
            <GoogleMap
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_API_KEY,
                    language: "en",
                    region: "US"
                }}
                style={{width: "100vw", height: "100vh"}}
                zoom={14}
                center={{
                    lat: 40.67222125,
                    lng: -73.4168324011658
                    }}>
            </GoogleMap>            
        );
    };
};