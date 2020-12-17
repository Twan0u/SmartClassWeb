import React, {Component} from "react";
import Dashboard from "./dashboard/dashboard";
import Login from './login/login'
import CreateTokenProvider from "../../libraries/createTokenProvider";



class Main extends Component {
    isLoggedIn(){
        return CreateTokenProvider().isLoggedIn();
    }
    update = () =>{
        this.props.update();
    }
    render(){
        return (
            <div>
                {this.isLoggedIn()?<Dashboard />:<Login update={this.update}/>}
            </div>
        );
    }

}
export default Main;