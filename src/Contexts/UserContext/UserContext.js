import React from "react";
import User from "../../components/User/User";

const UserContext = React.createContext({
    id: "",
    ads: [],
    logIn: ()=>{}
})

export default UserContext;

export class UserProvider extends React.Component{
    render(){
        const value = {

        };

        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}