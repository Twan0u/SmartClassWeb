import React, {Component} from "react"
import ItemEvent from "./itemEvent";
import ModalEvent from './modalEvent'
import ModalTask from './modalTask'
import CreateAuthProvider from '../../../../libraries/createAuthProvider'
import ItemTask from "./itemTask";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            size: 5,               //number of items to show when not see all
            title: props.title,     //title of the list component
            tasks: [],
            events: [],
            modalvisible: false,
            modalTaskVisible: false
        };

        this.handleSeeMore = this.handleSeeMore.bind(this);
    }

    componentDidMount() {
        const authProvider = CreateAuthProvider;
        Promise.all([
            fetch(authProvider.fetchApiURl('/events'), {
                method: 'get',
                headers: authProvider.fetchHeaders(),
                mode: 'cors',
            }),
            fetch(authProvider.fetchApiURl('/tasks'), {
                method: 'get',
                headers: authProvider.fetchHeaders(),
                mode: 'cors',
            })
        ])
            .then(([res1, res2]) => {
                if (!res1.ok) {
                    throw res1;
                }
                if (!res2.ok) {
                    throw res2;
                }
                return Promise.all([res1.json(), res2.json()]);
            })
            .then(([res1, res2]) => {
                this.setState({
                    isLoading: false,
                    events: res1,
                    tasks: res2
                });
            })
            .catch(function (error) {
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
                console.log("RESUME DE L'ERREUR : " + error.message);
            });
    }

    componentWillUnmount() {
    }

    merge(tasks, events) {
        let data = tasks.concat(events); //concatène les 2 tableaux
        data.sort(function (a, b) {// trie ceux-ci pour les afficher dans l'ordre chronologique
            return new Date(a.date) - new Date(b.date);
        });
        return data;
    }

    handleSeeMore() {
        let newSize = (this.state.size === 5) ? (this.state.tasks.length + this.state.events.length) : 5;
        this.setState({size: newSize});
    }

    listItems(i) {
        let tasks_data = this.state.tasks;
        let events_data = this.state.events;

        events_data?.forEach(item => {
            item.isEvent = true;
            item.date = new Date(item.date);
        });
        tasks_data?.forEach(item => {
            item.isEvent = false;
            item.date = new Date(item.date);
        });

        // merge les 2 listes et les trie par ordre chronologique
        let data = this.merge(tasks_data, events_data);

        let items = data?.slice(0, i);
        items = items?.map(item => {
            return (item.isEvent) ?
                <ItemEvent
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    date={item.date}
                />
                :
                <ItemTask
                    id={item.id}
                    title={item.title}
                    type={item.type}
                    schoolSubject={item.schoolsubject}
                    category={item.category}
                    date={item.date}
                />
                ;
        });
        return items;
    }

    handleShowModal = () => {
        if (this.state.modalvisible) {
            this.setState({modalvisible: false})
        } else {
            this.setState({modalvisible: true})
        }
    }

    handleShowModalTask = () => {
        if (this.state.modalTaskVisible) {
            this.setState({modalTaskVisible: false})
        } else {
            this.setState({modalTaskVisible: true})
        }
    }

    render() {
        return (
            <div>
                <ModalEvent isUpdate={false} visibility={this.state.modalvisible}
                            handleVisibility={this.handleShowModal}/>
                <ModalTask isUpdate={false} visibility={this.state.modalTaskVisible}
                           handleVisibility={this.handleShowModalTask}/>
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            {this.state.title} ({this.state.isLoading ? "Loading" : (this.state.events.length + this.state.tasks.length)})
                        </p>
                        <p className="card-header-icon">Ajouter:
                            &nbsp;
                            <span className="button is-small is-primary" onClick={this.handleShowModal}>événement</span>
                            &nbsp;&nbsp;
                            <span className="button is-small is-primary" onClick={this.handleShowModalTask}>tâche</span>
                        </p>
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
                        <a className="card-footer-item"
                           onClick={this.handleSeeMore}>{(this.state.size === 5) ? "Tout voir" : "Voir moins"}</a>
                    </footer>
                </div>
            </div>
        );
    }
}

export default List;