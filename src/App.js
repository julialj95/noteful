import React from "react";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import "./App.css";
import NotesListSidebar from "./NotesListSidebar/NotesListSidebar";
import NotesListMain from "./NotesListMain/NotesListMain";
import NoteItemSidebar from "./NoteItemSidebar/NoteItemSidebar";
import NoteItemMain from "./NoteItemMain/NoteItemMain";
import NotefulContext from "./NotefulContext";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      folders: [],
    };
    this.renderSidebar = this.renderSidebar.bind(this);
    this.renderMain = this.renderMain.bind(this);
    // this.findNotesForFolder = this.findNotesForFolder.bind(this);
    // this.findNoteMatch = this.findNoteMatch.bind(this);
  }

  deleteNote(noteId) {
    const newNotesList = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: newNotesList });
  }

  // findNotesForFolder(folderId) {
  //   const notes = !folderId
  //     ? this.state.notes
  //     : this.state.notes.filter((note) => note.folderId === folderId);
  //   return notes;
  // }

  // findNoteMatch(noteId) {
  //   const noteMatch = this.state.notes.find((note) => note.id === noteId);
  //   return noteMatch;
  // }

  // findFolderMatch(note) {
  //   const noteItem = this.state.notes.find((item) => item.id === note.id);
  //   const folderId = noteItem.folderId;
  //   const folderMatch = this.state.folders.find(
  //     (folder) => folder.id === folderId
  //   );
  //   return folderMatch;
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
        <Route
          exact
          path={"/"}
          component={NotesListSidebar}
          // render={() => {
          //   return <NotesListSidebar folders={this.state.folders} />;
          // }}
        />

        <Route
          exact
          path={"/folder/:folderId"}
          component={NotesListSidebar}
          // render={(routeProps) => {
          //   const { folderId } = routeProps.match.params;
          //   return (
          //     <NotesListSidebar
          //       {...routeProps}
          //       selectedFolderId={folderId}
          //       folders={this.state.folders}
          //     />
          //   );
          // }}
        />
        <Route
          exact
          path={"/note/:noteId"}
          component={NoteItemSidebar}
          // render={(routeProps) => {
          //   const { noteId } = routeProps.match.params;
          //   const note = this.findNoteMatch(noteId);
          //   const folderMatch = this.findFolderMatch(note);
          //   return (
          //     <NoteItemSidebar
          //       {...routeProps}
          //       folderName={folderMatch.name}
          //       folderId={folderMatch.id}
          //     />
          //   );
          // }}
        />
      </>
    );
  }
  renderMain() {
    return (
      <>
        <Route
          exact
          path={"/"}
          component={NotesListMain}
          // render={() => <NotesListMain notes={this.state.notes} />}
        />
        <Route
          exact
          path={`/folder/:folderId`}
          component={NotesListMain}
          // render={(routeProps) => {
          //   const { folderId } = routeProps.match.params;
          //   const notesList = this.findNotesForFolder(folderId);
          //   return <NotesListMain {...routeProps} notes={notesList} />;
          // }}
        />

        <Route
          exact
          path={"/note/:noteId"}
          component={NoteItemMain}
          // render={(routeProps) => {
          //   const { noteId } = routeProps.match.params;
          //   const noteContent = this.findNoteMatch(noteId);
          //   return <NoteItemMain {...routeProps} note={noteContent} />;
          // }}
        />
      </>
    );
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
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
