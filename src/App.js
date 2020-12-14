import React from "react";

import Navigation from "./components/navigation/Navigation";
import Hero from "./components/hero/BigHero";
import Bubble from "./components/bubble/Bubble";
import List from "./components/list/List";
import SearchBar from "./components/searchBar/SearchBar2";
import Footer from "./components/footer/footer";

function App() {

  return (
    <div id="app">
        <Navigation/>

      <div class="container">
        <div class="columns">
          <div class="column is-12">
            <Hero/>
            <br/>
            <Bubble/>
          </div>
        </div>
          <div class="columns">

            <div className="column is-4">
              <SearchBar/>
            </div>

            <div class="column is-8">

              <List
                  title = "Tâches et Evenements"
              />


            </div>{/*fin de la colonne de droite*/}
          </div>{/*fin de la main de la page*/}

      </div>
      <br/>
      <br/>
      <Footer/>
    </div>
  );
}

export default App;
