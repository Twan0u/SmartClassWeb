import React from "react"

function Hero(props){
    /*todo charger les données depuis l'api*/
    let data = {};
    data.username = "Antoine";
    const hello = `Bonjour ${data.username},` ;
    return(
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
export default Hero;