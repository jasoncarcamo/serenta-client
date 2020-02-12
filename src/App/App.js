import React from 'react';
import logo from '../logo.svg';
import './App.css';
import {Route} from "react-router-dom";

import HeaderNav from "../components/HeaderNav/HeaderNav";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PostAdRegister from "../components/PostAdRegister/PostAdRegister";
import Map from "../components/Map/Map";
import ToggleSearchBox from "../components/ToggleSearchBox/ToggleSearchBox";
import SearchSpaces from "../components/SearchBoxes/SearchSpaces/SearchSpaces";
import SearchJobs from "../components/SearchBoxes/SearchJobs/SearchJobs";
import FilterSpaces from "../components/Filters/FilterSpace/FilterSpace";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchSpaces: true,
            searchJobs: false,
            lat: 39.011902,
            long: -98.4842465,
            enableGps: false
        }
    };

    componentDidMount(){
        this.enableGps();
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
            enableGps: true
        });

    };

    error = (error)=>{
        console.log("Error")
    }

    renderSearchInputs = ()=>{
        if(this.state.searchSpaces){
            return <Route exact path="/" component={SearchSpaces}></Route>
        }

        if(this.state.searchJobs){
            return <Route exact path="/" component={SearchJobs}></Route>
        }
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
            return <Route exact path="/" component={FilterSpaces}></Route>
        }
    }

    render(){
        return (
            <section id="routes-container">
        
                <Route exact path="/" component={HeaderNav}></Route>

                {this.renderSearchInputs()}

                <Route exact path="/" render={(props)=> <Map {...props} lat={this.state.lat} lng={this.state.long} zoom={this.state.enableGps ? 13 : 4} center={{
                    lat: this.state.lat,
                    lng: this.state.long
                }}></Map>}></Route>

                <Route exact path="/" render={
                    (props) => <ToggleSearchBox {...props} showSpacesSearch={this.showSpacesSearch} showJobSearch={this.showJobSearch}></ToggleSearchBox>
                }></Route>

                {this.renderFilterButton()}
        
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/post-ad" component={PostAdRegister}></Route>
                <Route exact path="/post-ad/register" component={Register}></Route>
        
            </section>
          );
    };
};

export default App;
