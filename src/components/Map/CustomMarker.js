import React from "react";
import {Marker, InfoWindow} from "@react-google-maps/api";
import "./CustomMarker";

const windowsInfoStyle = {
    width: "35em",
};

const mobileInfoStyle = {
    width: "100%",
};

export default class Customarker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            screenWidth: window.innerWidth,
            open: false
        };
    };

    componentDidMount(){
        window.addEventListener("resize", (e)=>{
            this.setState({
                screenWidth: window.innerWidth
            })
        })
    }

    componentDidUpdate(){
        
    }

    getAddress = ()=>{
        return this.props.ad.address + " " + this.props.ad.city + " " + this.props.ad.state + " " + this.props.ad.zip_code;
    }

    renderAdInfo = ()=>{
        console.log(this.props.ad)
        return (
            <InfoWindow 
                position={this.props.position}
                onCloseClick={()=>{this.setState({ open: false})}}
                >
                <section 
                    className="ad-info" 
                    style={this.state.screenWidth > 770 ? windowsInfoStyle : mobileInfoStyle}>

                        <h2>
                            <strong>{this.props.ad.space_type}</strong>
                        </h2>
                        
                        <p>
                            <strong>Address: </strong>
                            {this.getAddress()}
                        </p>

                        <p>
                            <strong>Rooms: </strong>{this.props.ad.room_amount}
                        </p>

                        <p>
                            <strong>Bathrooms: </strong>{this.props.ad.bathroom_amount}
                        </p>

                        <p>
                            <strong>{this.props.ad.pets}</strong>
                        </p>

                        <p>
                            <strong>Price: </strong>${this.props.ad.price} / monthly
                        </p>

                        <p>
                            <strong><a href={`tel:${this.props.ad.mobile_number}`}>Call now: {this.props.ad.mobile_number}</a></strong>
                        </p>

                        <p>
                            <strong>Includes: </strong>
                            {this.props.ad.includes}
                        </p>

                        <p>
                            <strong>Comments from lister: </strong>
                            {this.props.ad.special_comments}
                        </p>

                </section>
            </InfoWindow>
        );
    };

    renderMarker = ()=>{
        return (
            <Marker onClick={this.toggleAdInfo} position={this.props.position} clusterer={this.props.clusterer}/>
        );
    }

    toggleAdInfo = (e)=>{

        this.setState({
            open: true
        });

    }

    render(){
        console.log(this.props)
        return (
            <section className="marker">
                
                {this.state.open ? this.renderAdInfo() : this.renderMarker()}
            </section>
        )
    };
};