import React from "react";

export default class SearchBox extends React.Component{
    render(){
        return (
            <p onClick={()=>{console.log("Clicked")}} 
            text="My Marker" style={{position: "fixed", zIndex: 1, backgroundColor: "red", height: "40vh"}}>
                Testing
            </p>
        )
    }
}