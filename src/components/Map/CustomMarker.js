import React from "react";
import {Marker, InfoWindow} from "@react-google-maps/api";
import "./CustomMarker";

const windowsInfoStyle = {
    width: "35em",
    backgroundColor: "orange"
};

const mobileInfoStyle = {
    width: "30em",
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

    componentWillReceiveProps(){
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
                            {this.props.ad.address}
                        </p>

                        <p>
                            display again
                        </p>

                </section>
            </InfoWindow>
        );
    };

    renderMarker = ()=>{
        return (
            <Marker onClick={this.toggleAdInfo} position={this.props.position}/>
        );
    }

    toggleAdInfo = (e)=>{

        this.setState({
            open: true
        });

    }

    render(){
        
        return (
            <section className="marker">
                
                {this.state.open ? this.renderAdInfo() : this.renderMarker()}
            </section>
        )
    };
};