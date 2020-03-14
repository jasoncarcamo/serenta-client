import React from "react";
import "./FilterSpaces.css";

export default class FilterSpaces extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterSpaces: false,
            space_type: "Bedroom",
            room_amount: "1 room",
            bathroom_amount: "1 bathroom",
            pets: "No pets",
            price: ""
        };
    };

    toggleFilter = ()=>{
        this.setState({
            filterSpaces: !this.state.filterSpaces
        })
    }

    handleInput = (e)=>{


        this.setState({
            [e.target.name]: e.target.value.toString()
        });

    }

    confirmButtons = ()=>{
        return (
            <section id="confirm-filter-btns">
                <button onClick={this.confirmFilter}>Filter</button>
                <button onClick={this.toggleFilter}>Cancel</button>
            </section>
        );
    }

    confirmFilter = ()=>{
        let filterSpaces = this.state;

        delete filterSpaces["filterSpaces"];
        
        this.props.filterSpaces(filterSpaces);
    }

    cancelFilter = () => {
        this.props.cancelFilter();
        this.setState({
            filterSpaces: false,
            space_type: "Bedroom",
            room_amount: "1 room",
            bathroom_amount: "1 bathroom",
            pets: "No pets",
            price: ""
        });
    }

    displayFilter = ()=>{

        return (
            <section id="filter-spaces-section">

                    <form id="filter-spaces-form">
                        <fieldset id="filter-spaces-fieldset">
                            <button id="filter-spaces-cancel-filter" onClick={this.cancelFilter}>Reset filter</button>

                            <label htmlFor="register-ad-type">Living space type:</label>
                            <select 
                                id="register-ad-type" 
                                name="space_type"
                                value={this.state.space_type}
                                onChange={this.handleInput}>
                                <option value="Bedroom">Bed Room</option>
                                <option value="Apartment">Apartment</option>
                            </select>

                            <p>Number of rooms:</p>
                                <label>
                                    <input type="radio" name="room_amount" value="1 room" onChange={this.handleInput}checked={this.state.room_amount === "1 room"}></input>1
                                </label>
                                
                                <label>
                                    <input type="radio" name="room_amount" value="2 rooms" onChange={this.handleInput}checked={this.state.room_amount === "2 rooms"}></input>2
                                </label>

                                <label>
                                    <input type="radio" name="room_amount" value="3 rooms" onChange={this.handleInput} checked={this.state.room_amount === "3 rooms"}></input>3
                                </label>

                                <label>
                                    <input type="radio" name="room_amount" value="4 rooms" onChange={this.handleInput} checked={this.state.room_amount === "4 rooms"}></input>4
                                </label>

                            <p>Number of bathrooms:</p>

                                <label>
                                    <input type="radio" name="bathroom_amount" value="1 bathroom" onChange={this.handleInput}  checked={this.state.bathroom_amount === "1 bathroom"}></input>1
                                </label>
                                
                                <label>
                                    <input type="radio" name="bathroom_amount" value="2 bathrooms" onChange={this.handleInput} checked={this.state.bathroom_amount === "2 bathrooms"}></input>2
                                </label>
                                
                                <label>
                                    <input type="radio" name="bathroom_amount" value="3 bathrooms" onChange={this.handleInput} checked={this.state.bathroom_amount === "3 bathrooms"}></input>3
                                </label>
                                
                                <label>
                                    <input type="radio" name="bathroom_amount" value="4 bathrooms" onChange={this.handleInput} checked={this.state.bathroom_amount === "4 bathrooms"}></input>4
                                </label>

                            <p>Pets:</p>
                            <label>
                                <input type="radio" name="pets" value="No pets" onChange={this.handleInput}  checked={this.state.pets === "No pets"}></input> No pets
                            </label>

                            <label>
                                <input type="radio" name="pets" value="Dogs ok" onChange={this.handleInput} checked={this.state.pets === "Dogs ok"}></input> Dogs allowed
                            </label>
                            
                            <label>
                                <input type="radio" name="pets" value="Cats ok" onChange={this.handleInput} checked={this.state.pets === "Cats ok"}></input> Cats allowed
                            </label>
                            
                            <label>
                                <input type="radio" name="pets" value="Dogs and Cats ok" onChange={this.handleInput} checked={this.state.pets === "Dogs and Cats ok"}></input> Dogs and Cats allowed
                            </label>

                            <p>Rent under:</p>
                            <label htmlFor="register-ad-price">
                                <input 
                                id="filter-ad-price" 
                                type="text"
                                name="price"
                                placeholder="E.g. 1500"
                                value={this.state.price}
                                onChange={this.handleInput}></input>
                            </label>
                            

                            {this.state.error ? <p>{this.state.error}</p> : ""}
                        </fieldset>
                    </form>

                    {this.confirmButtons()}
                </section>
        )
    }

    render(){
        
        return (
            <>  
                
                {this.state.filterSpaces ? this.displayFilter() : ""}

                <button id="filter-spaces-btn" onClick={this.toggleFilter}>Filter spaces</button>
            </>
        )
    }
}