import React from 'react';
import logo from '../logo.svg';
import './App.css';
import {Route} from "react-router-dom";
import TokenService from "../Services/TokenService";
import VisitorService from "../Services/VisitorService";
import SpacesContext from "../Contexts/SpacesContext/SpacesContext";

import MenuBurger from "../components/HeaderNav/MenuBurger";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import User from "../components/User/User";
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
            lng: -98.4842465,
            zoom: 4,
            enableGps: false
        }
    };

    static contextType = SpacesContext;

    componentDidMount(){
        console.log(VisitorService.hasToken())
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
        let lng = position.coords.longitude;

        this.setState({
            lat,
            lng,
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
        } else{
            return "";
        }
    }

    showSpacesSearch = () => {
        if(!this.state.searchSpaces){
            this.setState({
                searchSpaces: true,
                searchJobs: false
            });
        }
    };

    showJobSearch = ()=>{
        this.setState({
            searchSpaces: false,
            searchJobs: true
        });
    };

    toggleSpaceSearch = ()=>{
        this.setState({
            searchSpaces: !this.state.searchSpaces
        });
    }

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

                if(ad.price && spaceKey === "price"){
                    
                    return Number(ad[spaceKey]) <= Number(spaceValue) ? ad : "";
                }

                return ad[spaceKey] === spaceValue ? ad : "";
            });
        };

        this.setState({
            zoom: 10,
            lat: filteredSpaces[0] ? Number(filteredSpaces[0].lat) : this.state.lat,
            lng: filteredSpaces[0] ? Number(filteredSpaces[0].lng) : this.state.lng,
            ads: filteredSpaces
        });
    }

    cancelFilter = ()=>{
        this.componentDidMount();
    }

    searchArea = (lat, lng, zoom)=>{
        
        this.setState({
            lat,
            lng,
            zoom
        })
    }

    render(){

        return (
            <section id="routes-container">
        
                <Route path="/" component={HeaderNav}></Route>
                <Route path="/" component={MenuBurger}></Route>
                {this.renderSearchInputs()}
        
                <Route 
                    exact path="/" 
                    render={(props) => 
                        <Map {...props} 
                            ads={this.state.ads} 
                            lat={this.state.lat} 
                            lng={this.state.lng} 
                            zoom={this.state.zoom} 
                            center={{
                                lat: this.state.lat,
                                lng: this.state.lng
                            }}
                            toggleSpaceSearch={this.toggleSpaceSearch}
                            ></Map>}>
                </Route>

                {this.renderFilterButton()}
        
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>                
                {TokenService.hasToken() ? "" : <Route exact path="/post-ad/register" component={Register}></Route>}
                <Route path="/user" component={User}></Route>
                <Route exact path="/post-ad" component={PostAd}></Route>
        
            </section>
          );
    };
};

export default App;
