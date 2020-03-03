import React from "react";
import Ad from "./Ad/Ad";
import "./AdsContainer.css";

export default class AdsContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ads: []
        }
    }

    componentDidMount(){
        this.setState({
            ads: this.props.ads
        })
    };

    renderAds = () => {
        let ads = this.props.ads;

        ads = ads.map( (ad, index) => {
            return <Ad key={index} ad={ad}/>
        });

        return ads;
    }

    render(){
        
        return (
            <section id="user-ad-container">
                {this.props.ads.length > 0 ? this.renderAds() : <p>You do not have any ads listed</p>}
            </section>
        )
    }
}