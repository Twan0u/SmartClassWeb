import React from "react"

function Hero(props){
    const hello = "Bonjour " + props.data?.username ;
    return(
        <section className="hero is-info welcome is-small">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        {hello}
                    </h1>
                    <h2 className="subtitle">
                        J'espère que vous passez une bonne journée!
                    </h2>
                </div>
            </div>
        </section>
    );
}
export default Hero;