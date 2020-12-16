import React, { Component } from "react";
//import CreateAuthProvider from '../../../../libraries/createAuthProvider'

class Item extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id      : props.id,
            isEvent : props.isEvent,
            date    : props.date,
            title   : props.title,
        };
    }

    deleteData() {
        console.log("ola");
        //const authProvider = CreateAuthProvider;
        /*let path;
        if(this.state.isEvent){
            path='/events';
        }else{
            path='/tasks';
        }
        path+='/'+this.state.id;*/
        /*fetch(authProvider.fetchApiURl('/tasks/1'), {
            method :'delete',
            headers : authProvider.fetchHeaders(),
            mode: 'cors',
        })
            .then(response => response.json());*/
    }

    render() {
        return (
            <tr>
                <td width="5%"><i className={(this.state.isEvent) ? "fa fa-calendar" : "fa fa-check"}/></td>
                <td>{this.state.date} : {this.state.title}</td>
                <td className="level-right">
                    <a className="button is-small is-info" ><i className="fa fa-pencil"/></a>
                    &nbsp;&nbsp;&nbsp;
                    <a className="button is-small is-info has-background-danger" onClick={this.deleteData} ><i className="fa fa-trash"/></a>
                </td>
            </tr>
        );
    }
}

export default Item;