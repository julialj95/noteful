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
    this.deleteFolder = this.deleteFolder.bind(this);
    // this.updateNote = this.updateNote.bind(this);
  }

  deleteNote(noteId) {
    const newNotesList = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: newNotesList });
  }

  deleteFolder(folderId) {
    const newFoldersList = this.state.folders.filter(
      (folder) => folder.id !== folderId
    );
    const newNotesList = this.state.notes.filter((note) => {
      console.log("note.folder", note.folder, "folderId", folderId);
      return note.folder !== folderId;
    });
    console.log(newNotesList);
    this.setState({ notes: newNotesList, folders: newFoldersList });
  }

  // updateNote(noteId) {}

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:8000/api/folders"),
      fetch("http://localhost:8000/api/notes"),
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
      })
      .catch((error) => console.error(error));
  }

  renderSidebar() {
    return (
      <>
        <p></p>
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
      deleteFolder: this.deleteFolder,
    };
    return (
      <>
        <NotefulContext.Provider value={contextValue}>
          <Header />
          <div className="main-content">
            <div className="sidebar">{this.renderSidebar()}</div>
            <div className="main-list">{this.renderMain()}</div>
          </div>
        </NotefulContext.Provider>
      </>
    );
  }
}
export default App;
