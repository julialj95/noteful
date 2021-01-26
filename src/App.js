import React from "react";
// import { Route } from "react-dom-router";
import Header from "./Header";
import "./App.css";
import dummystore from "./dummystore";
import NotesListSidebar from "./NotesListSidebar/NotesListSidebar";
import NotesListMain from "./NotesListMain/NotesListMain";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dummystore,
    };
  }

  render() {
    return (
      <>
        <Header />
        <NotesListSidebar />
        <NotesListMain data={this.state.dummystore} />
      </>
    );
  }
}
export default App;
