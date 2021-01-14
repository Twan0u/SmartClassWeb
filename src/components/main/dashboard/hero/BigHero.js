import React, {Component} from "react"
import CreateAuthProvider from "../../../../libraries/createAuthProvider";

class Hero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            teacher: {}
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        let authProvider = CreateAuthProvider;

        fetch(authProvider.fetchApiURl('/class/teacher'), {
            method: 'get',
            headers: authProvider.fetchHeaders(),
            mode: 'cors',
        })
            .then((response) => {
                if (!response.ok) {
                    throw response
                }
                return response.json()
            })
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    teacher: responseJson
                });
            })
            .catch(function (error) {
                switch (error.status) {
                    case 401:
                        alert("Il y a eu une erreur dans l'authentification de l'utilisateur");
                        break;
                    case 403:
                        alert("Le role de l'utilisateur ne permets pas cette action");
                        break;
                    case 404:
                        alert("La ressource n'a pas été trouvée");
                        break;
                    default:
                        alert("OOPS, il y a eu une erreur");
                }
                console.log("RESUME DE L'ERREUR : " + error.message);
            });
    }

    render() {
        const hello = `Bonjour ${this.state.teacher?.firstname + " " + this.state.teacher?.lastname},`;
        return (
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h1 className="title">
                        {hello}
                    </h1>
                    <h2 className="subtitle">
                        Content de vous revoir parmi nous
                    </h2>
                </div>
            </div>
        );
    }
}

export default Hero;