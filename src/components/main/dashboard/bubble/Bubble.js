import React from "react"
import Individual from "./Individual";
function Bubble(props){
    return (
        <section className="info-tiles">
            <div className="tile is-ancestor has-text-centered">
                <Individual
                    title = "42"
                    apiCall = ""
                    subtitle = "élèves"
                />
                <Individual
                    title = "12"
                    apiCall = ""
                    subtitle = "Interrogations non signées"
                />
                <Individual
                    title = "69"
                    apiCall = ""
                    subtitle = "Evénements à venir"
                />
            </div>
        </section>
    );
}
export default Bubble;