import React from "react";

const SpacesContext = React.createContext({
    ads: [],
    fresh: ()=>{}
})

export default SpacesContext;

export class SpacesProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ads: [],
            loading: true,
            error: ""
        };
    };

    componentDidMount(){
        fetch(`http://localhost:8000/api/living-space`, {
            headers: {
                'content-type': "application/json",
            }
        })
            .then( adsRes => {

                if(!adsRes.ok){
                    return adsRes.json().then ( e => Promise.reject(e));
                };

                return adsRes.json();
            })
            .then( adsData => {
                
                this.setState({ 
                    ads: adsData.ads,
                    loading: false
                });
                
            })
            .catch( err => this.setState({
                error: err.error, 
                loading: false
            }));
    }

    refresh = () => {
        
        this.setState({
            loading: true
        });

        this.componentDidMount();
    }

    render(){

        const value = {
            ads: this.state.ads,
            refresh: this.refresh
        };
        
        return (
            <SpacesContext.Provider value={value}>
                {this.state.loading ? <p>Loading screen</p> : this.props.children}
            </SpacesContext.Provider>
        );
    };
} ;