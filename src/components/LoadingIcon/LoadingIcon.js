import React from "react";
import ReactLoading from "react-loading";
import "./LoadingIcon.css";

export default class LoadingIcon extends React.Component{
    render(){
        return <ReactLoading className="Loading" type={"spin"} color={"black"}></ReactLoading>
    }
}