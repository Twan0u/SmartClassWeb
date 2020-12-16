import React, {Component} from "react";
import Hero from "./hero/BigHero";
import Bubble from "./bubble/Bubble";
import SearchBar from "./searchBar/SearchBar2";
import List from "./list/List";

class Dashboard extends Component {
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
export default Dashboard;