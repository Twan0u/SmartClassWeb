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
            .then((response) => response.json())
            .then((responseJson)=>{
                this.setState({
                    isLoading : false,
                    data : responseJson
                });
            })
            .catch(function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
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