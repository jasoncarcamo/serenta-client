import React from "react";
import "./Marker.css";

export default class Marker extends React.Component{
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
            <section className="ad-info">

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
        );
    };

    toggleAdInfo = (e)=>{

        console.log("toggled", e.target);

        this.setState({
            open: true
        });

    }

    render(){
        
        return (
            <section onClick={this.toggleAdInfo} className="marker">
                {this.state.open ? this.renderAdInfo() : ""}
            </section>
        )
    };
};