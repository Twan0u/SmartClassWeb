import React, { Component } from "react"
import User from "./user";
import CreateAuthProvider from "../../../../libraries/createAuthProvider";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading   : true,
            data        : [],
            filteredData : [],
            input : "",
        };

        // Cette liaison est nécéssaire afin de permettre
        // l'utilisation de `this` dans la fonction de rappel.
        this.handleSearch = this.handleSearch.bind(this);
    }
    /*handleSearch(){
        return "";
    }*/

    componentDidMount() {
        this.setState({isLoading : true});
        let authProvider = CreateAuthProvider;

            fetch(authProvider.fetchApiURl('/class/pupils'), {
                method :'get',
                headers : authProvider.fetchHeaders(),
                mode: 'cors',
            })
            .then((response) => {
                if(!response.ok){throw response}
                return response.json()
            })
            .then((responseJson)=>{
                this.setState({
                    isLoading : false,
                    data : responseJson
                });
            })
                .catch(function(error) {
                    switch (error.status) {
                        case 401:
                            alert("Il y a eu une erreur dans l'authentification de l'utilisateur");
                            break;
                        case 403:
                            alert("Le role de l'utilisateur ne permets pas cette action");
                            break;
                        case 404:
                            alert("La ressource n'a pas été trouvée");
                            break;
                        default:
                            alert("OOPS, il y a eu une erreur");
                    }
                    console.log("RESUME DE L'ERREUR : "+ error.message);
                });
    }

    handleSearch(event){
        this.setState({isLoading : true});
        let data = this.state.data.filter(student => (student.firstname + " " + student.lastname).toLowerCase().includes(event.target.value.toLowerCase()))
        this.setState({input : event.target.value, filteredData: data, isLoading : false})
        console.log(event.target.value);
    }

    listUsers(){
        if (this.state.input ===""){
            return "";
        }else{
            return this.state.filteredData?.map(user =>{
                return (<User name = {user.firstname + " " +user.lastname } />);
            });
        }
    }
    render() {
        return (
            <nav className="panel" style={{backgroundColor: "#FFF"}}>
                <p className="panel-heading">
                    Rechercher un(e) élève
                </p>
                <div className="panel-block">
                    <p className={this.state.isLoading?"control has-icons-left is-loading":"control has-icons-left"}>
                        <input className="input" onChange={this.handleSearch} value={this.state.input} type="text" placeholder="Search" />
                      <span className="icon is-left">
                        <i className="fa fa-search" aria-hidden="true"/>
                      </span>
                    </p>
                </div>
                {this.listUsers()}
            </nav>
        );
    }
}

export default SearchBar;