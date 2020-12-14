import React from "react";

import Navigation from "./components/navigation/Navigation";
import Main from "./components/main/main"
import Footer from "./components/footer/footer";

function App() {
  return (
    <div id="app">
        <Navigation/>
        <Main/>
        <Footer/>
    </div>
  );
}

export default App;
