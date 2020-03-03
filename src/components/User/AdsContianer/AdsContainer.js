import React from "react";
import Ad from "./Ad/Ad";

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
        console.log(this.state.ads)
        return (
            <section>
                {this.props.ads ? this.renderAds() : <p>You do not have any listed ads</p>}
            </section>
        )
    }
}