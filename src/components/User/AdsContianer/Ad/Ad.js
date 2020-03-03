import React from "react";
import "./Ad.css";
import TokenService from "../../../../Services/TokenService";

export default class Ad extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            delete: false
        }
    }

    askDeletion = ()=>{
        this.setState({
            delete: true
        })
    }

    cancelDeletion = ()=>{
        this.setState({
            delete: false
        })
    }

    renderAd = ()=>{
        return (
            <section className="user-ad">
                An Ad
                <p>{this.props.ad.address}</p>

                <button 
                    className="delete"
                    onClick={this.askDeletion}>Remove</button>
            </section>
        )
    }

    confirmDeletion = ()=>{
        return (
            <section className="user-ad">

                <p>Are you sure?</p>

                <div className="ad-deletion-box">
                    <button>Yes</button>
                    <button 
                        onClick={this.cancelDeletion}>Cancel</button>
                </div>
            </section>
        )
    }

    handleDeletion = (e)=>{
        e.preventDefault();

        fetch(`http://localhost:8000/api/living-space/${this.props.ad.id}`, {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${TokenService.getToken()}`
            }
        })
    }

    render(){

        return (
            <>
                {this.state.delete ? this.confirmDeletion() : this.renderAd()}
            </>
        )
    }
}