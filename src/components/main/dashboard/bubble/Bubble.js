import React, {Component} from "react"
import Individual from "./Individual";
import CreateAuthProvider from "../../../../libraries/createAuthProvider";

class Bubble extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading   : true,
            numberEvents:0,
            numberPupils:0,
            numberTasks:0,
        };
    }

    componentDidMount() {
        const authProvider = CreateAuthProvider;
        Promise.all([
        fetch(authProvider.fetchApiURl('/events'), {
            method :'get',
            headers : authProvider.fetchHeaders(),
            mode: 'cors',
        }),
        fetch(authProvider.fetchApiURl('/class/pupils'), {
            method :'get',
            headers : authProvider.fetchHeaders(),
            mode: 'cors',
        }),
            fetch(authProvider.fetchApiURl('/tasks'), {
                method :'get',
                headers : authProvider.fetchHeaders(),
                mode: 'cors',
            })
        ])
            .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
            .then(([res1, res2,  res3])=>{
                this.setState({
                    isLoading : false,
                    numberEvents: res1.length,
                    numberPupils: res2.length,
                    numberTasks: res3.length,
                });
            })
    }

    componentWillUnmount() {}

    render() {
        return (
            <section className="info-tiles">
                <div className="tile is-ancestor has-text-centered">
                    <Individual
                        title = {(this.state.isLoading)?"Chargement":this.state.numberPupils}
                        subtitle = "élève(s)"
                    />
                    <Individual
                        title = {(this.state.isLoading)?"Chargement":this.state.numberTasks}
                        subtitle = "tâche(s)"
                    />
                    <Individual
                        title ={(this.state.isLoading)?"Chargement":this.state.numberEvents}
                        subtitle = "événement(s)"
                    />
                </div>
            </section>
        );
    }
}
export default Bubble;