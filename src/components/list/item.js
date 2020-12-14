import React, { Component } from "react";

class Item extends Component{
    constructor(props) {
        super(props);
        this.state = {
            icon    : props.icon,
            date    : props.date,
            title   : props.title,
            link    : props.link,
        };
    }

    render() {
        return (
            <tr>
                <td width="5%"><i className={this.state.icon}></i></td>
                <td>{this.state.date} : {this.state.title}</td>
                <td className="level-right"><a className="button is-small is-info" href={this.state.link}><i
                    className="fa fa-chevron-right"></i></a></td>
            </tr>
        );
    }
}

export default Item;