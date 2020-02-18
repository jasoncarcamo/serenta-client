import React from 'react';
import logo from '../logo.svg';
import './App.css';
import {Route} from "react-router-dom";
import TokenService from "../Services/TokenService";
import SpacesContext from "../Contexts/SpacesContext/SpacesContext";

import HeaderNav from "../components/HeaderNav/HeaderNav";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PostAd from "../components/PostAd/PostAd";
import Map from "../components/Map/Map";
import ToggleSearchBox from "../components/ToggleSearchBox/ToggleSearchBox";
import SearchSpaces from "../components/SearchBoxes/SearchSpaces/SearchSpaces";
import SearchJobs from "../components/SearchBoxes/SearchJobs/SearchJobs";
import FilterSpaces from "../components/Filters/FilterSpace/FilterSpace";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ads: [],
            searchSpaces: true,
            searchJobs: false,
            lat: 39.011902,
            long: -98.4842465,
            zoom: 4,
            enableGps: false
        }
    };

    static contextType = SpacesContext;

    componentDidMount(){

        this.enableGps();
        
        this.setState({
            ads: this.context.ads
        });
    }

    enableGps = ()=>{
        const positionOption = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 60000
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.success, this.Error, positionOption);
        } else { 
        console.log("Geolocation is not supported by this browser. ");
        };
    };

    success = (position)=>{
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        this.setState({
            lat,
            long,
            zoom: 13,
            enableGps: true
        });

    };

    error = (error)=>{
        console.log("Error");
    };

    renderSearchInputs = ()=>{
        if(this.state.searchSpaces){
            return <Route exact path="/" render={(props)=> <SearchSpaces {...props} searchArea={this.searchArea}></SearchSpaces>}></Route>
        };

        if(this.state.searchJobs){
            return <Route exact path="/" component={SearchJobs}></Route>
        };
    }

    showSpacesSearch = () => {
        this.setState({
            searchSpaces: true,
            searchJobs: false
        });
    };

    showJobSearch = ()=>{
        this.setState({
            searchSpaces: false,
            searchJobs: true
        });
    };

    renderFilterButton = ()=>{
        if(this.state.searchSpaces){
            return <Route exact path="/" render={(props) => <FilterSpaces {...props} cancelFilter={this.cancelFilter} filterSpaces={this.filterSpaces}/>}></Route>
        }
    }

    filterSpaces = (filterInfo)=>{
        const spaces = filterInfo;
        let allAds = this.context.ads;
        let filteredSpaces = allAds;
        
        for(const [spaceKey, spaceValue] of Object.entries(spaces)){
            
            filteredSpaces = filteredSpaces.filter( ( ad, index)=> {

                return ad[spaceKey] === spaceValue ? ad : ""
            });
        }

        this.setState({
            ads: filteredSpaces
        });

        console.log(this.state.ads)
    }

    cancelFilter = ()=>{
        this.componentDidMount();
    }

    searchArea = (lat, lng, zoom)=>{
        
        this.setState({
            lat,
            long: lng,
            zoom
        })
    }

    render(){
        console.log(this.state.ads)
        return (
            <section id="routes-container">
        
                <Route exact path="/" component={HeaderNav}></Route>

                {this.renderSearchInputs()}

                <Route exact path="/" render={
                    (props) => <ToggleSearchBox 
                            {...props} 
                            showSpacesSearch={this.showSpacesSearch} 
                            showJobSearch={this.showJobSearch}>                            
                        </ToggleSearchBox>
                }></Route>
        
                <Route exact path="/" render={(props)=> <Map {...props} ads={this.state.ads} lat={this.state.lat} lng={this.state.long} zoom={this.state.zoom} center={{
                    lat: this.state.lat,
                    lng: this.state.long
                }}></Map>}></Route>

                {this.renderFilterButton()}
        
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>                
                {TokenService.hasToken() ? "" : <Route exact path="/post-ad/register" component={Register}></Route>}
                <Route exact path="/post-ad" component={PostAd}></Route>
        
            </section>
          );
    };
};

export default App;
