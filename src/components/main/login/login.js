import React, {Component} from "react";
import CreateAuthProvider from "../../../libraries/createAuthProvider";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.email + " " + this.state.password)
        const authProvider = CreateAuthProvider;
        fetch(authProvider.fetchApiURl('/login'), {
            method: 'post',
            headers: authProvider.fetchHeaders(),
            mode: 'cors',
            body: JSON.stringify({
                "username": this.state.email,
                "password": this.state.password
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw response
                }
                return response.json();
            })
            .then((responseJson) => {
                authProvider.login(responseJson);
                this.props.update();
            })
            .catch(function (error) {
                switch (error.status) {
                    case 400:
                        alert("Il manque le nom d'utilisateur ou le mot de passe");
                        break;
                    case 401:
                        alert("Le nom d'utilisateur ou le mot de passe est Faux");
                        break;
                    case 404:
                        alert("L'utilisateur n'existe pas");
                        break;
                    default:
                        alert("OOPS, il y a eu une erreur");
                }
                console.log("RESUME DE L'ERREUR : " + error.message);
            });
    }

    render() {
        return (
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                <form action="" className="box">
                                    <div className="field">
                                        <label htmlFor="" className="label">Email</label>
                                        <div className="control has-icons-left">
                                            <input type="email" placeholder="e.g. bobsmith@gmail.com" className="input"
                                                   onChange={(e) => this.setState({email: e.target.value})} required/>
                                            <span className="icon is-small is-left">
                                              <i className="fa fa-envelope"/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="" className="label">Password</label>
                                        <div className="control has-icons-left">
                                            <input type="password" placeholder="*******" className="input"
                                                   onChange={(e) => this.setState({password: e.target.value})}
                                                   required/>
                                            <span className="icon is-small is-left">
                                              <i className="fa fa-lock"/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <button className="button is-success" disabled={!this.validateForm()}
                                                onClick={this.handleSubmit}>
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default Login;