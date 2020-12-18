import React, { Component } from "react";
import CreateAuthProvider from '../../../../libraries/createAuthProvider'
import ModalTask from "./modalTask";

class ItemTask extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id : props.id,
            title : props.title,
            type : props.type,
            schoolSubject : props.schoolSubject,
            category : props.category,
            date : props.date,
            modalVisible: false,
        };
        this.deleteData = this.deleteData.bind(this);
        this.handleShowModal =this.handleShowModal.bind(this);
    }

    handleShowModal = () => {
        if (this.state.modalVisible) {
            this.setState({modalVisible: false})
        } else {
            this.setState({modalVisible: true})
        }
    }

    deleteData() {
        const authProvider = CreateAuthProvider;
        fetch(authProvider.fetchApiURl('/tasks/'+this.state.id+'/delete'), {
            method :'get',
            headers : authProvider.fetchHeaders(),
            mode: 'cors',
        })
        .then((response) => {
            if(!response.ok){throw response}
            alert("La tache à bien été supprimée");
            window.location.reload();
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

    render() {
        return (
            <tr>
                <ModalTask isUpdate={true} id={this.state.id} title={this.state.title} type={this.state.type} date={this.state.date} visibility={this.state.modalVisible} handleVisibility={this.handleShowModal}/>
                <td width="5%"><i className={this.state.type==='devoir'?"fa fa-edit":this.state.type==='leçon'?"fa fa-book":"fa fa-check"}/></td>
                <td>{this.state.date.toLocaleString('fr-FR', {day: '2-digit'}) + " " + this.state.date.toLocaleString('fr-FR', {month: 'short'})} : {this.state.schoolSubject+" ("+this.state.category+") - "+this.state.title}</td>
                <td className="level-right">
                    <a className="button is-small is-info" onClick={this.handleShowModal} ><i className="fa fa-pencil"/></a>
                    &nbsp;&nbsp;&nbsp;
                    <a className="button is-small is-info has-background-danger" onClick={this.deleteData} ><i className="fa fa-trash"/></a>
                </td>
            </tr>
        );
    }
}

export default ItemTask;