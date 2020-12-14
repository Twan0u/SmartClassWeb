import React from "react"

function Individual(props){
return(
    <div className="tile is-parent">
        <article className="tile is-child box">
            <p className="title">{props.title}</p>
            <p className="subtitle">{props.subtitle}</p>
        </article>
    </div>
);
}
export default Individual