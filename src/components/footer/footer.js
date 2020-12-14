import React, {Component} from "react";

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        Created by <strong>Antoine Dumont</strong> and <strong>Antoine Lambert</strong>
                    </p>
                </div>
            </footer>
        );
    }
}
export default Footer;