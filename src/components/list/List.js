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
            data        : [],              //data of all elements of the list
        };

        // Cette liaison est nécéssaire afin de permettre
        // l'utilisation de `this` dans la fonction de rappel.
        this.handleSeeMore = this.handleSeeMore.bind(this);
    }

    async componentDidMount() {//todo remove async
        const delay = async (ms:number) => new Promise(res => setTimeout(res, ms));
        await delay(1000);//todo réellement faire un appel à l'api

        //simule un appel à une api
        let task_data = [
            {
                date : "2020-11-10",
                title : "Tester cette fonction",
            },
            {
                date : "2020-11-27",
                title : "Teste 123",
            },
            {
                date : "2020-11-30",
                title : "Teste 3",
            },
        ];
        //simule un appel à une api
        let events_data = [//todo
            {
                date : "2020-11-22",
                title : "Tester cette fonction",
            },
            {
                date : "2020-11-23",
                title : "Teste 123",
            },
        ];

        // formatage des données
        this.dataFormating(task_data,"fa fa-check");
        this.dataFormating(events_data,"fa fa-calendar");

        // marge les 2 listes et les trie par ordre chronologique
        let data = this.merge(task_data,events_data);

        //change le state
        this.setState({isLoading : false, data : data});
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
        let newSize = (this.state.size===1)?this.state.data.length:1;
        this.setState({size : newSize});
    }

    listItems(i){
       let items = this.state.data?.slice(0, i);
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
                            {this.state.title} ({this.state.isLoading?"Loading":this.state.data.length})
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