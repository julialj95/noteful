import React from "react";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import "./App.css";
import dummystore from "./dummystore";
import NotesListSidebar from "./NotesListSidebar/NotesListSidebar";
import NotesListMain from "./NotesListMain/NotesListMain";

function findFolderMatch(folderId) {
  const folderMatch = this.state.dummystore.folders.find(
    (folder) => folder.id === folderId
  );
  return folderMatch;
}

function findNoteMatch(noteId) {
  const noteMatch = this.state.dummystore.notes.find(
    (note) => note.id === noteId
  );
  return noteMatch;
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dummystore,
    };
  }

  renderSidebar() {
    return (
      <>
        <Route
          path={"/note/:noteId"}
          render={(routeProps) => {
            const folder = findFolderMatch(folderId);
            <NoteItemSidebar {...routeProps} folder={folder} />;
          }}
        />
      </>
    );
    const folders = (
      <Route
        path={`/note/${dummystore.notes.id}`}
        component={NoteItemMain}
      ></Route>
    );
  }
  renderMain() {
    <Route path={`/folder/${dummystore.folders.id}`}></Route>;
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-content">
          <div className="sidebar">
            <NotesListSidebar data={this.state.dummystore} />
          </div>
          <div className="main-list">
            <NotesListMain data={this.state.dummystore} />
          </div>
        </div>
      </>
    );
  }
}
export default App;
