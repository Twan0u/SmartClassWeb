import React, { Component } from "react"

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
        };
    }
    render(){
        return(
            <a className="panel-block">
                <span className="panel-icon">
                    <i className="fa fa-user" aria-hidden="true"/>
                </span>
                {this.state.name}
            </a>);
    }
}
export default User;