import React from "react";
import {Marker, InfoWindow} from "@react-google-maps/api";

export default class Customarker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        };
    };

    componentWillReceiveProps(){
    }

    renderAdInfo = ()=>{
        return (
            <InfoWindow 
                className="ad-info"
                position={this.props.position}
                onCloseClick={()=>{this.setState({ open: false})}}
                >
                <section>
                    <p style={{}} onClick={()=>{this.setState({
                        open: false
                    })}}>
                        x
                    </p>
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