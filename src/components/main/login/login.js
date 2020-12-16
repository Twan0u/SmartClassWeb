import React, {Component} from "react";
import CreateAuthProvider from "../../../libraries/createAuthProvider";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password:""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const authProvider = CreateAuthProvider;
        fetch(authProvider.fetchApiURl('/login'), {
            method :'post',
            headers : authProvider.fetchHeaders(),
            mode: 'cors',
            body : JSON.stringify({
                "username" : this.state.email,
                "password" : this.state.password
            })
        })
            .then((response) => response.json())
            .then((responseJson)=>{
                authProvider.login(responseJson);
                this.props.update();
            })
            .catch(function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });
    }

    render(){
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
                                            <input type="email" placeholder="e.g. bobsmith@gmail.com" className="input" onChange={(e) => this.setState({email : e.target.value})} required/>
                                            <span className="icon is-small is-left">
                                              <i className="fa fa-envelope"/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="" className="label">Password</label>
                                        <div className="control has-icons-left">
                                            <input type="password" placeholder="*******" className="input" onChange={(e) => this.setState({password : e.target.value})} required/>
                                            <span className="icon is-small is-left">
                                              <i className="fa fa-lock"/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <button className="button is-success" disabled={!this.validateForm()} onClick={this.handleSubmit}>
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