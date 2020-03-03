import React from "react";
import "./Ad.css";
import LoadingIcon from "../../../LoadingIcon/LoadingIcon";
import SpaceContext from "../../../../Contexts/SpacesContext/SpacesContext";
import TokenService from "../../../../Services/TokenService";

export default class Ad extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            delete: false,
            deletionLoading: false,
            deleteConfirmed: false
        }
    }

    static contextType = SpaceContext;

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
                
                <p>You have {this.props.ad.space_type === "Apartment" ? "an apartment" : " a bedroom"} listed</p>

                <p><strong>Address:</strong> {this.props.ad.address} {this.props.ad.city} {this.props.ad.state} {this.props.ad.zip_code}</p>

                <p><strong>Number provided: </strong>{this.props.ad.mobile_number}</p>

                <p>${this.props.ad.price} / monthly</p>

                <p><strong>Pets: </strong>{this.props.ad.pets}</p>

                <p><strong>Includes: </strong>{this.props.ad.includes}</p>

                <p>
                    <strong>Comment provided: </strong>
                    {this.props.ad.special_comment}
                </p>

                <p>
                    <strong>Created: </strong>
                    {new Date(this.props.ad.date_created).toDateString()}
                </p>

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

                {!this.state.deletionLoading ? this.renderConfirmBtns() : <LoadingIcon/>}
            </section>
        )
    }

    renderConfirmBtns = ()=>{
        return (
            <div className="ad-deletion-box">
                <button
                    onClick={this.handleDeletion}>Yes</button>
                <button 
                    onClick={this.cancelDeletion}>Cancel</button>
            </div>
        );
    };

    confirmed = ()=>{
        return (
            <section className="user-ad">
                <p>Your ad has successfully been deleted</p>
                <button
                    onClick={this.handleConfirmation}>Ok</button>
            </section>
        )
    }

    handleConfirmation = ()=>{
        this.context.refresh();
    }

    handleDeletion = (e)=>{
        e.preventDefault();

        this.setState({
            deletionLoading: true
        })

        fetch(`http://localhost:8000/api/living-space/${this.props.ad.id}`, {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${TokenService.getToken()}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData)
                this.setState({
                    deletionLoading: false,
                    delete: false,
                    confirmDeletion: true
                })
            })
            .catch( err => this.setState({ 
                error: err.error,
                deletionLoading: false,
                confirmDeletion: false
            }));
    }

    render(){

        return (
            <>
                {this.state.delete 
                    ? this.confirmDeletion() 
                    : 
                    this.state.confirmDeletion
                    ?
                    this.confirmed()
                    :
                    this.renderAd()}
                
            </>
        )
    }
}