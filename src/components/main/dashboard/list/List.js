import React, { Component } from "react"
import Item from "./item";
/*import Modal from "./modal";*/

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading   : true,
            size        : 1,               //number of items to show when not see all
            title       : props.title,     //title of the list component
            tasks       : [],
            events      : [],
        };

        this.handleSeeMore = this.handleSeeMore.bind(this);
    }
    componentDidMount() {
        /*fetch("http://192.168.1.22/events")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoading : false,
                        events : result.items
                    });
                },
                // Remarque : il est important de traiter les erreurs ici
                // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
                // des exceptions provenant de réels bugs du composant.
                (error) => {
                    this.setState({
                        isLoading : false,
                        error
                    });
                }
            )
        fetch("http://192.168.1.22/tasks")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tasks : result.items,
                        isLoading : false
                    });
                },
                // Remarque : il est important de traiter les erreurs ici
                // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
                // des exceptions provenant de réels bugs du composant.
                (error) => {
                    this.setState({
                        isLoading : false,
                        error
                    });
                }
            )*/

    }

    componentWillUnmount() {}

    merge(tasks, events){
        let data = tasks.concat(events); //concatène les 2 tableaux
        data.sort(function(a,b){// trie ceux-ci pour les afficher dans l'ordre chronologique
            return new Date(a.date) - new Date(b.date);
        });
        return data;
    }
    dataFormating(array,icon){
        array?.forEach(item =>{
            item.icon = "fa fa-check";
            item.date = new Date(item.date);
        });
    }
    handleSeeMore(){
        let newSize = (this.state.size===1)?(this.state.tasks.length+this.state.events.length):1;
        this.setState({size : newSize});
    }

    listItems(i){
        let tasks_data = this.state.tasks;
        let events_data = this.state.events;

        // Formatage des données
        this.dataFormating(tasks_data,"fa fa-check");
        this.dataFormating(events_data,"fa fa-calendar");

        // marge les 2 listes et les trie par ordre chronologique
        let data = this.merge(tasks_data,events_data);

       let items = data?.slice(0, i);
        items = items?.map(item =>{
            return <Item
                icon = {item.icon}
                date = {item.date.toLocaleString('fr-FR', { day: '2-digit' })+ " " + item.date.toLocaleString('fr-FR', { month: 'short' })}
                title = {item.title}
                //link = {item.link}
            />;
        });
        return items;
    }

    render() {
        return (
            <div >
                {/*modal*/}
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            {this.state.title} ({this.state.isLoading?"Loading":(this.state.events.length+this.state.tasks.length)})
                        </p>
                        <a href="http://www.google.com"  className="card-header-icon" aria-label="more options">
                                        <span className="icon">
                                            <a className="button is-small is-primary" href="http://www.google.com">
                                                <i className="fa fa-plus"/>{/*todo*/}
                                            </a>
                                        </span>
                        </a>
                    </header>
                    <div className="card-table">
                        <div className="content">
                            <table className="table is-fullwidth is-striped">
                                <tbody>
                                {this.listItems(this.state.size)}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <footer className="card-footer">
                        <a className="card-footer-item" onClick={this.handleSeeMore}>{(this.state.size===1)?"Tout voir" : "Voir moins"}</a>
                    </footer>

                </div>
            </div>
        );
    }
}

export default List;