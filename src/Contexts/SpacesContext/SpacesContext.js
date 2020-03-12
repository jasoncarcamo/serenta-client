import React from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Loading from "react-loading";

const SpacesContext = React.createContext({
    ads: [],
    refresh: ()=>{}
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
        fetch(`https://intense-wave-93060.herokuapp.com/api/living-space`, {
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
                {this.state.loading ? <LoadingScreen/> : this.props.children}
            </SpacesContext.Provider>
        );
    };
} ;