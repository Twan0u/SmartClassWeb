import React, { Component } from "react";
import CreateAuthProvider from '../../../../libraries/createAuthProvider'
import Modal from "./modal";

class Item extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id : props.id,
            name : props.name,
            description : props.description,
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
        fetch(authProvider.fetchApiURl('/events/'+this.state.id+'/delete'), {
            method :'get',
            headers : authProvider.fetchHeaders(),
            mode: 'cors',
        })
    }

    render() {
        return (
            <tr>
                <Modal isUpdate={true} id = {this.state.id} name={this.state.name} description={this.state.description} date={this.state.date} visibility={this.state.modalVisible} handleVisibility={this.handleShowModal}/>
                <td width="5%"><i className="fa fa-calendar"/></td>
                <td>{this.state.date} : {this.state.name +" - "+this.state.description}</td>
                <td className="level-right">
                    <a className="button is-small is-info" onClick={this.handleShowModal} ><i className="fa fa-pencil"/></a>
                    &nbsp;&nbsp;&nbsp;
                    <a className="button is-small is-info has-background-danger" onClick={this.deleteData} ><i className="fa fa-trash"/></a>
                </td>
            </tr>
        );
    }
}

export default Item;