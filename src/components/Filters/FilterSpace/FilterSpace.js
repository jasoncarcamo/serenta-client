import React from "react";
import "./FilterSpaces.css";

export default class FilterSpaces extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterSpaces: false,
            radioroom_amount: "1 room",
            radiobathroom_amount: "1 bathroom",
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

        console.log(e.target.name, e.target.value, e.target.checked);

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
        )
    }

    confirmFilter = ()=>{
        let prevState = this.state
        let filterSpaces = this.state;

        delete filterSpaces["filterSpaces"];
        delete filterSpaces["radioroom_amount"];
        delete filterSpaces["radiobathroom_amount"];
        delete filterSpaces["radiopets"];
        
        this.props.filterSpaces(filterSpaces);
    }

    cancelFilter = () => {
        this.props.cancelFilter();
        this.setState({
            filterSpaces: false
        })
    }

    displayFilter = ()=>{

        return (
            <section id="filter-spaces-section">
                <button onClick={this.cancelFilter}>Cancel filter</button>
                    <form>
                        <fieldset>

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
                                    <input type="radio" name="bathroom_amount" value="1 bathroom" onChange={this.handleInput}  checked={this.state.bathroom_amount === "1 bathroom"}></input> 1
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
                                <input type="radio" name="pets" value="Dogs ok" onChange={this.handleInput} checked={this.state.pets === "Dogs ok"}></input> Dogs
                            </label>
                            
                            <label>
                                <input type="radio" name="pets" value="Cats ok" onChange={this.handleInput} checked={this.state.pets === "Cats ok"}></input>Cats
                            </label>
                            
                            <label>
                                <input type="radio" name="pets" value="Dogs and Cats ok" onChange={this.handleInput} checked={this.state.pets === "Dogs and Cats ok"}></input>Dogs and Cats
                            </label>

                            <label htmlFor="register-ad-price">Price:</label>
                            <input 
                                id="register-ad-price" 
                                type="text"
                                name="price"
                                onChange={this.handleInput}></input>

                            {this.state.error ? <p>{this.state.error}</p> : ""}
                        </fieldset>
                    </form>

                    {this.confirmButtons()}
                </section>
        )
    }

    render(){
        console.log(this.state)
        return (
            <>  
                
                {this.state.filterSpaces ? this.displayFilter() : ""}

                <button id="filter-spaces-btn" onClick={this.toggleFilter}>Filter spaces</button>
            </>
        )
    }
}