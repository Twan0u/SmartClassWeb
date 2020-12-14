import React, { Component } from "react"

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text : props.text,
            color : props.color??"is-primary",
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(){
        this.props.delete();
    }

    render() {
        return (
            <div className={"notification " +  this.state.color}>
                <button className="delete" onClick={this.handleDelete}/>
                {this.state.text}
            </div>
        );
    }
}

export default Modal
