import React, {Component} from "react";

import Navigation from "./components/navigation/Navigation";
import Main from "./components/main/main"
import Footer from "./components/footer/footer";

class App extends Component {
    update = () =>{
        this.forceUpdate();
    }
    render() {
        return (
            <div id="app">
                <Navigation update={this.update}/>
                <Main update={this.update}/>
                <Footer/>
            </div>
        );
    }
}
export default App;
