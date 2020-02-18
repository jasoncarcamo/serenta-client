import React from "react";
import { GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import CustomMarker from "./Marker";

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
            let position = {
                lat: Number(ad.lat),
                lng: Number(ad.lng)
            }
            
            return <CustomMarker key={index} ad={ad} position={position}/>
        });

        return ads;
    }

    render(){
        
        return (
            <GoogleMap
                id="map"
                className="map"
                mapContainerStyle={{
                    height: "100vh",
                    width: "100%"
                    }}
                    zoom={this.props.zoom}
                    center={this.props.center}
                    options={{
                        fullscreenControl: false,
                        mapTypeId: "hybrid",
                        mapTypeControl: false
                    }}
                >
                {this.renderAds()}
            </GoogleMap>     
        );
    };
};