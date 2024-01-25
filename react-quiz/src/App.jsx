import { useState } from "react";
import Main from "./components/Main";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}

export default App;
