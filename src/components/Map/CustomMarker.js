import React from "react";
import {Marker, InfoWindow} from "@react-google-maps/api";
import "./CustomMarker";

const windowsInfoStyle = {
    width: "35em",
    backgroundColor: "orange"
};

const mobileInfoStyle = {
    width: "100%",
    backgroundColor: "orange"
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

    renderAdInfo = ()=>{
        return (
            <InfoWindow 
                position={this.props.position}
                onCloseClick={()=>{this.setState({ open: false})}}
                >
                <section 
                    className="ad-info" 
                    style={this.state.screenWidth > 770 ? windowsInfoStyle : mobileInfoStyle}>

                        <p>
                            <strong>{this.props.ad.space_type}</strong>
                        </p>
                        
                        <p>
                            <strong>address: </strong>
                            {this.props.ad.address + " " + this.props.ad.city + " " + this.props.ad.state + " " + this.props.ad.zip_code}
                        </p>

                        <p>
                            <strong>Rooms: </strong>{this.props.ad.room_amount}
                        </p>

                        <p>
                            <strong>Bathrooms: </strong>{this.props.ad.bathroom_amount}
                        </p>

                        <p>
                            {this.props.ad.pets}
                        </p>

                        <p>
                            <strong>Price: </strong>{this.props.ad.price}
                        </p>

                        <p>
                            <strong>Call lister</strong>
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