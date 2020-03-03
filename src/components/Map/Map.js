import React from "react";
import { GoogleMap, LoadScript, MarkerClusterer, Marker, StreetViewPanorama} from "@react-google-maps/api";
import CustomMarker from "./CustomMarker";

export default class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ads: [],
            lat: "",
            lng: ""
        };
    };


    componentDidMount(){
        this.getUserLocation();
        this.setState({
            ads: this.props.ads
        })
    }

    componentWillReceiveProps(){

        this.setState({
            ads: this.props.ads
        });
        
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

    getUserLocation = ()=>{
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

    renderAds = (clusterer )=>{
        let ads = this.props.ads;

        ads = ads.map( ( ad, index) => {
            
            let position = {
                lat: Number(ad.lat),
                lng: Number(ad.lng)
            }
            
            return <CustomMarker key={index} ad={ad} position={position} clusterer={clusterer}/>
        });

        return ads;
    }

    toggleSearchFocus = ()=>{
      const input = document.getElementsByClassName("location-search-input");
      if(!input[0]){
          return;
      }
      input[0].blur()
    }

    render(){
        const options = {
            imagePath:"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m" 
        };

        return (
            <GoogleMap
                id="map"
                className="map"
                mapContainerStyle={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: "100%",
                    padding: 0,
                    margin: 0,
                    }}
                zoom={this.props.zoom}
                onClick={this.toggleSearchFocus}
                onZoomChanged={this.toggleSearchFocus}
                onDragEnd={this.toggleSearchFocus}
                center={this.props.center}
                options={{
                    fullscreenControl: false,
                    mapTypeId: "hybrid",
                    mapTypeControl: false
                    
                }}  
                >

                <MarkerClusterer
                    options={options}>
                        {(clusterer)=> this.renderAds(clusterer)}
                </MarkerClusterer>

                <StreetViewPanorama 
                    onCloseclick={this.props.toggleSpaceSearch}
                    onVisibleChanged={this.props.toggleSpaceSearch}
                    options={{
                        fullscreenControl: false
                  }}
                ></StreetViewPanorama>
                
            </GoogleMap>     
        );
    };
};