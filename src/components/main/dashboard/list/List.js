import React, { Component } from "react"
import Item from "./item";
/*import Modal from "./modal*/
import CreateAuthProvider from '../../../../libraries/createAuthProvider'

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
        const authProvider = CreateAuthProvider;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiQW50b2luZSIsImxhc3RuYW1lIjoiTGFtYmVydCIsImxvZ2luIjoiYW50LmxhbWIuYWxAZ21haWwuY29tIiwiaWRjbGFzcyI6MSwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE2MDgwMzU2NDAsImV4cCI6MTYwODAzNzQ0MH0.zRnXPRvL1g4IqnR8E0swAhMS1XCYQU-pfZE7urMaufs'

        fetch(authProvider.fetchApiURl('/events'), {
            method :'get',
            headers : authProvider.fetchHeaders(),
            mode: 'cors',
        })
            .then(response=> response.json())
            .then((responseJson)=>{
                responseJson?.forEach(item =>{
                    item.icon = "fa fa-calendar";
                    item.date = new Date(item.date);
                });
                return responseJson
            })
            .then((responseJson)=>{
                this.setState({
                    isLoading : false,
                    events : responseJson
                });
            })
        console.log(authProvider.fetchApiURl('/tasks'))
        fetch(authProvider.fetchApiURl('/tasks'), {
            method :'get',
            headers: new Headers({
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + token
            }),
            mode: 'cors',
        })
            .then(response=> response.json())
            .then((responseJson)=>{
                responseJson?.forEach(item =>{
                    item.name = item.schoolsubject +" ("+ item.category +")";
                    item.description = item.title;
                    item.icon = "fa fa-check";
                    item.date = new Date(item.date);
                });
                return responseJson;
            })
            .then((responseJson)=>{
                responseJson?.forEach(item =>{
                    item.name = item.schoolsubject +" ("+ item.category +")";
                    item.description = item.title;
                    item.icon = "fa fa-check";
                    item.date = new Date(item.date);
                });
                this.setState({
                    isLoading : false,
                    tasks : responseJson
                });
            })
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

        });
    }
    handleSeeMore(){
        let newSize = (this.state.size===1)?(this.state.tasks.length+this.state.events.length):1;
        this.setState({size : newSize});
    }

    listItems(i){
        let tasks_data = this.state.tasks;
        let events_data = this.state.events;

        // marge les 2 listes et les trie par ordre chronologique
        let data = this.merge(tasks_data,events_data);

       let items = data?.slice(0, i);
        items = items?.map(item =>{
            return <Item
                icon = {item.icon}
                date = {item.date.toLocaleString('fr-FR', { day: '2-digit' })+ " " + item.date.toLocaleString('fr-FR', { month: 'short' })}
                title = {item.name + " - " + item.description}
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
                        <a href="https://www.google.com"  className="card-header-icon" aria-label="more options">
                                        <span className="icon">
                                            <a className="button is-small is-primary" href="https://www.google.com">
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
                        <span className="card-footer-item"  onClick={this.handleSeeMore}>{(this.state.size===1)?"Tout voir" : "Voir moins"}</span>
                    </footer>
                </div>
            </div>
        );
    }
}

export default List;