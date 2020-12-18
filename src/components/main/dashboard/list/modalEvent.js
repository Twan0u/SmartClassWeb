import React, { Component } from "react"
import CreateAuthProvider from '../../../../libraries/createAuthProvider'
import formatDate from '../../../../format/format'

class ModalEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdate : props.isUpdate,
            id : props.id,
            name : props.name,
            description: props.description,
            date : (props.isUpdate)?formatDate(props.date):formatDate(new Date()),
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleDelete(){
        this.props.delete();
    }
    validateForm() {
        return this.state.name?.length > 0 && this.state.date?.length > 0;
    }
    handleSave(){
        let authProvider = CreateAuthProvider;
        if(this.state.isUpdate){
            fetch(authProvider.fetchApiURl('/events/'+this.state.id+'/update'), {
                method: 'post',
                headers: authProvider.fetchHeaders(),
                mode: 'cors',
                body: JSON.stringify({
                    "name": this.state.name,
                    "description": this.state.description,
                    "date": this.state.date
                })
            })
                .then((response) => {
                    if(!response.ok){throw response}
                    alert("L'événement à bien été modifié");
                    this.setState({
                        name: "",
                        description: "",
                        date: ""
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
        else {
            fetch(authProvider.fetchApiURl('/events'), {
                method: 'post',
                headers: authProvider.fetchHeaders(),
                mode: 'cors',
                body: JSON.stringify({
                    "name": this.state.name,
                    "description": this.state.description,
                    "date": this.state.date
                })
            })
            .then((response) => {
                if(!response.ok){throw response}
                alert("L'événement à bien été ajouté");
                this.setState({
                    name: "",
                    description: "",
                    date: ""
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
    }

    render() {
        return (

            <div className={this.props.visibility?'modal is-active':'modal'}>
                <div className="modal-background"/>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Ajout d'un événement</p>
                        <button className="delete" aria-label="close" onClick={this.props.handleVisibility}/>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Titre</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Visite au musée" onChange={(e) => this.setState({name: e.target.value})} value={this.state.name}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Ne pas oublier l'argent et son masque" onChange={(e) => this.setState({description: e.target.value})} value={this.state.description}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Date</label>
                            <div className="control">
                                <input className="input" type="date" onChange={(e) => this.setState({date: e.target.value})} value={this.state.date} min={formatDate(new Date())} />
                            </div>
                        </div>

                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={this.handleSave} disabled={!this.validateForm()}>Save changes</button>
                    </footer>
                </div>
            </div>
        );
    }
}

export default ModalEvent