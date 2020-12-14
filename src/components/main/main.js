import React, {Component} from "react";
import Hero from "./dashboard/hero/BigHero";
import Bubble from "./dashboard/bubble/Bubble";
import SearchBar from "./dashboard/searchBar/SearchBar2";
import List from "./dashboard/list/List";


class Main extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="container">
                <div className="columns">
                    <div className="column is-12">
                        <Hero/>

                        <Bubble/>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-4">
                        <SearchBar/>
                    </div>
                    <div className="column is-8">
                        <List
                            title="Tâches et Evenements"
                        />
                    </div>{/*fin de la colonne de droite*/}
                </div>{/*fin de la main de la page*/}
            </div>
        );
    }
}
export default Main;