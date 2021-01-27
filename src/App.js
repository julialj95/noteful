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

function findNoteMatch(noteId) {
  const noteMatch = this.state.dummystore.notes.find(
    (note) => note.id === noteId
  );
  return noteMatch;
}

function findNotesForFolder(folderId) {
  const notes = !folderId
    ? this.state.dummyprops.notes
    : this.state.dummyprops.notesfilter((note) => note.folderId === folderId);
  return notes;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dummystore,
    };
    this.renderSidebar = this.renderSidebar.bind(this);
    this.renderMain = this.renderMain.bind(this);
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
            console.log(folderId);
            const notesInFolder = findNotesForFolder(folderId);
            console.log(notesInFolder);
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
            const note = findNoteMatch(noteId);
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
            const notesList = findNotesForFolder(folderId);
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
