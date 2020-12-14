import React, { Component } from "react"

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading   : true,
            data        : [],
        };

        // Cette liaison est nécéssaire afin de permettre
        // l'utilisation de `this` dans la fonction de rappel.
        //this.handleSeeMore = this.handleSeeMore.bind(this);
    }
    /*handleSearch(){
        return "";
    }*/
    render() {
        return (
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        Recherche d'un(e) élève
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                        <div className="control has-icons-left has-icons-right">
                            <input className="input is-large" type="text" placeholder=""/>
                            <span className="icon is-medium is-left">
                                <i className="fa fa-search"/>
                            </span>
                            <span className="icon is-medium is-right">
                                <i className="fa fa-user"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar
