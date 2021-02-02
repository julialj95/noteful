import React from "react";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import "./App.css";
import NotesListSidebar from "./NotesListSidebar/NotesListSidebar";
import NotesListMain from "./NotesListMain/NotesListMain";
import NoteItemSidebar from "./NoteItemSidebar/NoteItemSidebar";
import NoteItemMain from "./NoteItemMain/NoteItemMain";
import NotefulContext from "./NotefulContext";
import ErrorComponent from "./ErrorComponent";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      folders: [],
    };
    this.renderSidebar = this.renderSidebar.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    // this.redirectOnDelete = this.redirectOnDelete.bind(this);
  }

  deleteNote(noteId) {
    const newNotesList = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: newNotesList });
  }

  // redirectOnDelete() {
  //   if (this.props.match.path === "/note/:noteId") {
  //     this.props.history.push("/");
  //   }
  // }

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:9090/folders"),
      fetch("http://localhost:9090/notes"),
    ])
      .then(([foldersResponse, notesResponse]) => {
        if (!foldersResponse.ok)
          return foldersResponse.json().then((event) => Promise.reject(event));
        if (!notesResponse.ok)
          return notesResponse.json().then((event) => Promise.reject(event));
        return Promise.all([foldersResponse.json(), notesResponse.json()]);
      })
      .then(([folders, notes]) => {
        this.setState({ folders, notes });
      });
  }

  renderSidebar() {
    return (
      <>
        <ErrorComponent>
          <Route exact path={"/"} component={NotesListSidebar} />
        </ErrorComponent>
        <ErrorComponent>
          <Route
            exact
            path={"/folder/:folderId"}
            component={NotesListSidebar}
          />
        </ErrorComponent>
        <ErrorComponent>
          <Route exact path={"/note/:noteId"} component={NoteItemSidebar} />
        </ErrorComponent>
      </>
    );
  }
  renderMain() {
    return (
      <>
        <ErrorComponent>
          <Route exact path={"/"} component={NotesListMain} />
        </ErrorComponent>
        <ErrorComponent>
          <Route exact path={`/folder/:folderId`} component={NotesListMain} />
        </ErrorComponent>
        <ErrorComponent>
          <Route exact path={"/note/:noteId"} component={NoteItemMain} />
        </ErrorComponent>
      </>
    );
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      // redirectOnDelete: this.redirectOnDelete,
    };
    return (
      <>
        <NotefulContext.Provider value={contextValue}>
          <div className="main-content">
            <div className="sidebar">{this.renderSidebar()}</div>
            <div className="main-list">
              <Header />
              {this.renderMain()}
            </div>
          </div>
        </NotefulContext.Provider>
      </>
    );
  }
}
export default App;
