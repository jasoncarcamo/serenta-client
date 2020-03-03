import React from "react";
import User from "../../components/User/User";
import TokenService from "../../Services/TokenService";

const UserContext = React.createContext({
    user: {},
    ads: [],
    logIn: ()=>{}
})

export default UserContext;

export class UserProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {},
            ads: [],
            error: ""
        };
    };

    componentDidMount(){
        if(TokenService.hasToken()){
            
            this.getInfo();
            this.getAds();

        };
    }

    getInfo = ()=>{
        Promise.all([
            fetch("http://localhost:8000/api/user", {
                headers: {
                    'content-type': "application/json",
                    'authorization': `bearer ${TokenService.getToken()}`
                }
            }),
            fetch("http://localhost:8000/api/living-space", {
                headers: {
                    'content-type': "application/json",
                    'authorization': `bearer ${TokenService.getToken()}`
                }
            })
        ])
            .then(([userRes, adsRes])=> {
                if(!userRes.ok){
                    return userRes.json().then( e => Promise.reject(e));
                };

                if(!adsRes.ok){
                    return adsRes.json().then( e => Promise.reject(e));
                };

                return Promise.all([ userRes.json(), adsRes.json()]);
            })
            .then(([userData, adsData])=>{
                this.setState({
                    user: userData.user,
                    ads: this.findUserAds(userData.user.id, adsData.ads)
                })
                
            })
            .catch( err => this.setState({ error: err.error}))
    }

    getAds = ()=>{
        fetch("http://localhost:8000/api/living-space", {
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

                this.setState({
                    ads: this.findUserAds( this.state.user.id, resData.ads)
                });

            })
            .catch( err => this.setState({ error: err.error}))
    }

    findUserAds = (id, ads)=>{
        let userAds = ads.filter( ad => ad.user_id === id ? ad : "");

        return userAds;
    }

    render(){
        const value = {
            ads: this.state.ads
        };
        console.log(this.state)
        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}