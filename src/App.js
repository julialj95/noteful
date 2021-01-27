import React from "react";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import "./App.css";
import dummystore from "./dummystore";
import NotesListSidebar from "./NotesListSidebar/NotesListSidebar";
import NotesListMain from "./NotesListMain/NotesListMain";
import NoteItemSidebar from "./NoteItemSidebar/NoteItemSidebar";
import NoteItemMain from "./NoteItemMain/NoteItemMain";

// function findFolderMatch(folderId) {
//   const folderMatch = this.state.dummystore.folders.find(
//     (folder) => folder.id === folderId
//   );
//   return folderMatch;
// }

// function findNotesForFolder(folderId) {
//   let filteredNotes = [];
//   const noteArray = dummystore.notes.map((note) => {
//     if (note.folderId === folderId) {
//       filteredNotes.push(note);
//     }
//     return filteredNotes;
//   });
//   return noteArray;
// }
// function findNotesForFolder(folderId) {
//   const notes = !folderId
//     ? this.state.dummyprops.notes
//     : this.state.dummyprops.notes.filter((note) => note.folderId === folderId);
//   return notes;
// }
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dummystore,
    };
    this.renderSidebar = this.renderSidebar.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.findNotesForFolder = this.findNotesForFolder.bind(this);
    this.findNoteMatch = this.findNoteMatch.bind(this);
  }

  findNotesForFolder(folderId) {
    const notes = !folderId
      ? this.state.dummystore.notes
      : this.state.dummystore.notes.filter(
          (note) => note.folderId === folderId
        );
    return notes;
  }

  findNoteMatch(noteId) {
    const noteMatch = this.state.dummystore.notes.find(
      (note) => note.id === noteId
    );
    return noteMatch;
  }
  findFolderMatch(note) {
    const noteItem = this.state.dummystore.notes.find(
      (item) => item.id === note.id
    );
    const folderId = noteItem.folderId;
    const folderMatch = this.state.dummystore.folders.find(
      (folder) => folder.id === folderId
    );
    return folderMatch;
  }

  renderSidebar() {
    return (
      <>
        <Route
          exact
          path={"/"}
          render={() => {
            return <NotesListSidebar folders={this.state.dummystore.folders} />;
          }}
        />

        <Route
          exact
          path={"/folder/:folderId"}
          render={(routeProps) => {
            const { folderId } = routeProps.match.params;
            return (
              <NotesListSidebar
                {...routeProps}
                selectedFolder={folderId}
                folders={this.state.dummystore.folders}
              />
            );
          }}
        />
        <Route
          exact
          path={"/note/:noteId"}
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const note = this.findNoteMatch(noteId);
            const folderMatch = this.findFolderMatch(note);
            return (
              <NoteItemSidebar
                {...routeProps}
                folderName={folderMatch.name}
                folderId={folderMatch.id}
              />
            );
          }}
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
          render={() => <NotesListMain notes={this.state.dummystore.notes} />}
        />
        <Route
          exact
          path={`/folder/:folderId`}
          render={(routeProps) => {
            const { folderId } = routeProps.match.params;
            const notesList = this.findNotesForFolder(folderId);
            return <NotesListMain {...routeProps} notes={notesList} />;
          }}
        />

        <Route
          exact
          path={"/note/:noteId"}
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const noteContent = this.findNoteMatch(noteId);
            return <NoteItemMain {...routeProps} note={noteContent} />;
          }}
        />
      </>
    );
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-content">
          <div className="sidebar">{this.renderSidebar()}</div>
          <div className="main-list">{this.renderMain()}</div>
        </div>
      </>
    );
  }
}
export default App;
