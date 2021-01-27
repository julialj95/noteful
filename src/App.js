import React from "react";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import "./App.css";
import dummystore from "./dummystore";
import NotesListSidebar from "./NotesListSidebar/NotesListSidebar";
import NotesListMain from "./NotesListMain/NotesListMain";
import NoteItemSidebar from "./NoteItemSidebar/NoteItemSidebar";

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

  renderSidebar() {
    return (
      <>
        <Route
          exact
          path={"/"}
          render={() => (
            <NotesListSidebar
              folders={this.state.dummystore.folders}
              notes={this.state.dummystore.notes}
            />
          )}
        />

        <Route
          exact
          path={"/folder/:folderId"}
          render={(routeProps) => {
            const { folderId } = routeProps.match.params;
            const notesInFolder = this.findNotesForFolder(folderId);
            return (
              <NotesListSidebar
                {...routeProps}
                folders={this.state.dummystore.folders}
                notes={notesInFolder}
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
            return <NoteItemSidebar {...routeProps} note={note} />;
          }}
        />
      </>
    );
  }
  // const folder = findFolderMatch(folderId);
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
        ;
      </>
    );
  }

  // notes={notesForFolder}

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
