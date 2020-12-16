import React, {Component} from "react";
import Dashboard from "./dashboard/dashboard";
import Login from './login/login'
import CreateTokenProvider from "../../libraries/createTokenProvider";



class Main extends Component {
    isLoggedIn(){
        return CreateTokenProvider().isLoggedIn();
    }
    render(){

        return (
            <div>
                {this.isLoggedIn()?<Dashboard/>:<Login/>}
            </div>
        );
    }

}
export default Main;