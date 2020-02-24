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
        this.cick();
        this.setState({
            ads: this.props.ads
        })
    }

    componentWillReceiveProps(){

        this.setState({
            ads: this.props.ads
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

    renderTestAds = (clusterer)=>{
        var features = [
            
            {
                lat: -33.91721, 
                lng: 151.22630,
              type: 'info'
            }, 
            {
                lat: -33.91539, 
                lng: 151.22820,
              type: 'info'
            }, 
            {
                lat: -33.91747, 
                lng: 151.22912,
              type: 'info'
            }, 
            {
                lat: -33.91910, 
                lng: 151.22907,
              type: 'info'
            }, 
            {
                lat: -33.91725, 
                lng: 151.23011,
              type: 'info'
            }, 
            {
                lat: -33.91872, 
                lng: 151.23089,
              type: 'info'
            }, 
            {
                lat: -33.91784, 
                lng: 151.23094,
              type: 'info'
            }, 
            {
                lat: -33.91682, 
                lng: 151.23149,
              type: 'info'
            }, 
            {
                lat: -33.91790, 
                lng: 151.23463,
              type: 'info'
            }, 
            {
                lat: -33.91666, 
                lng: 151.23468,
              type: 'info'
            }, 
            {
                lat: -33.916988, 
                lng: 151.23364,
              type: 'info'
            }, 
            {
                lat: -33.91662347903106, 
                lng: 151.22879464019775,
              type: 'parking'
            }, 
            {
                lat: -33.916365282092855, 
                lng: 151.22937399734496,
              type: 'parking'
            }, 
            {
                lat: -33.91665018901448, 
                lng: 151.2282474695587,
              type: 'parking'
            }, 
            {
                lat: -33.919543720969806, 
                lng: 151.23112279762267,
              type: 'parking'
            }, 
            {
                lat: -33.91608037421864, 
                lng: 151.23288232673644,
              type: 'parking'
            }, 
            {
                lat: -33.91851096391805, 
                lng: 151.2344058214569,
              type: 'parking'
            }, 
            {
                lat: -33.91818154739766, 
                lng: 151.2346203981781,
              type: 'parking'
            }, 
            {
                lat: -33.91727341958453, 
                lng: 151.23348314155578,
              type: 'library'
            }
          ];

          features = features.map( (position, index)=> {
                let markerPosition = {
                    lat: position.lat,
                    lng: position.lng
                }

                let ad = {
                    address: "An address"
                };

              return <CustomMarker key={index} ad={ad} position={markerPosition} clusterer={clusterer}/> 
          });

          return features
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
                <Marker icon="https://maps.google.com/mapfiles/kml/paddle/blu-stars.png" style={{width: "1.5em"}} position={this.props.center}/>
                
                <MarkerClusterer
                    options={options}>
                        {(clusterer)=> this.renderTestAds(clusterer)}
                </MarkerClusterer>

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