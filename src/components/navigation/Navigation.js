import React from "react"

function Navigation(){
    return (
        <nav className="navbar is-white" style={{borderTopWidth: 0}}>
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src={"./logo.png"} width="112" height="28"/>
                    </a>
                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </a>
                </div>
                <div id="navMenu" className="navbar-menu">
                    <div className="navbar-end">
                        <a className="navbar-item" href="/" >Acceuil</a>
                        <a className="navbar-item" href="/classroom">Ma Classe</a>
                        <a className="navbar-item" href="/eval">Mes Interrogations</a>
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-info" href="/logout">
                                    <strong>Se Déconnecter</strong>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </nav>
    );
}
export default Navigation