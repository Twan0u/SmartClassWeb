import React, { Component } from "react"
import CreateAuthProvider from '../../../../libraries/createAuthProvider'

class ModalTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdate : props.isUpdate,
            id : props.id,
            title : props.title,
            type: props.type,
            schoolSubject:props.schoolSubject,
            date : props.date,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleDelete(){
        this.props.delete();
    }
    validateForm() {
        return this.state.title?.length > 0  && this.state.date?.length > 0  && this.state.schoolSubject?.length > 0 ;
    }
    handleSave(){
        let authProvider = CreateAuthProvider;
        if(this.state.isUpdate){
            console.log("maj");
            /*fetch(authProvider.fetchApiURl('/tasks/'+this.state.id+'/update'), {
                method :'post',
                headers : authProvider.fetchHeaders(),
                mode: 'cors',
                body : JSON.stringify({
                    "title" : this.state.title,
                    "type" : this.state.type,
                    // grammaire pour le moment
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
                });*/
        }else {
            console.log("add");
            /*fetch(authProvider.fetchApiURl('/tasks'), {
                method: 'post',
                headers: authProvider.fetchHeaders(),
                mode: 'cors',
                body: JSON.stringify({
                    "title": this.state.title,
                    "type": this.state.type,
                    "idSchoolSubjectSubCategory": 1,
                    "date": this.state.date
                })
            })
                .then(() => {
                    this.setState({
                        title: "",
                        type: "",
                        schoolSubject: "",
                        date: ""
                    });
                })
                .catch(function (error) {
                    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                });*/
        }
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
                                <input className="input" type="text" placeholder="Lire le livre" onChange={(e) => this.setState({title : e.target.value})} value={this.state.title}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Type</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Devoir/Leçon" onChange={(e) => this.setState({type : e.target.value})} value={this.state.type}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Matière</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Français" onChange={(e) => this.setState({schoolSubject : e.target.value})} value={this.state.schoolSubject}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Date</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="2020-12-17" onChange={(e) => this.setState({date : e.target.value})} value={this.state.date}/>
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