import React, { Component } from "react"
import CreateAuthProvider from '../../../../libraries/createAuthProvider'

class ModalTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : "",
            type: "",
            schoolSubject:1,
            date : "",
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleDelete(){
        this.props.delete();
    }
    validateForm() {
        return this.state.title.length > 0  && this.state.date.length > 0  && this.state.schoolSubject.length > 0 ;
    }
    handleSave(){
        let authProvider = CreateAuthProvider;
        console.log('sauvegarde de : ' + this.state.date + ' ' + this.state.title + " " + this.state.type+" "+this.state.schoolSubject)
        fetch(authProvider.fetchApiURl('/tasks'), {
            method :'post',
            headers : authProvider.fetchHeaders(),
            mode: 'cors',
            body : JSON.stringify({
                "title" : this.state.title,
                "type" : this.state.type,
                "idSchoolSubjectSubCategory" : 1,
                "date" : this.state.date
            })
        })
            .then(()=>{
                this.setState({
                    title : "",
                    type: "",
                    schoolSubject:"",
                    date : ""
                });
            })
            .catch(function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });
    }

    render() {
        return (
            <div className={this.props.visibility?'modal is-active':'modal'}>
                <div className="modal-background"/>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Ajout d'une tâche</p>
                        <button className="delete" aria-label="close" onClick={this.props.handleVisibility}/>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Titre</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Lire le livre" onChange={(e) => this.setState({title : e.target.value})}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Type</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Devoir/Leçon" onChange={(e) => this.setState({type : e.target.value})}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Matière</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Français" onChange={(e) => this.setState({schoolSubject : e.target.value})}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Date</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="2020-12-17" onChange={(e) => this.setState({date : e.target.value})}/>
                            </div>
                        </div>

                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={this.handleSave} disabled={!this.validateForm()}>Save changes</button>
                    </footer>
                </div>
            </div>
        );
    }
}

export default ModalTask