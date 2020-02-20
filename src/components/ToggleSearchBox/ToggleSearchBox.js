import React from "react";
import "./ToggleSearchBox.css";

export default class ToggleSearchBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    showSpacesSearch = () => {
        this.props.showSpacesSearch();
    };

    showJobSearch = ()=>{
        this.props.showJobSearch()
    };

    render(){
        return (
            <section id="toggle-search-boxes">
                <button  onClick={this.showSpacesSearch}>Living Spaces</button>
            </section>
        )
    }
}