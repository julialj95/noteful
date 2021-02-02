import React from "react";
import NoteBox from "../NoteBox/NoteBox";
import "./NoteItemMain.css";
import NotefulContext from "../NotefulContext";

class NoteItemMain extends React.Component {
  static contextType = NotefulContext;

  findNoteMatch(noteId) {
    const { notes } = this.context;
    const noteMatch = notes.find((note) => note.id === noteId);
    return noteMatch;
  }

  redirectOnDelete = () => {
    return this.props.history.push("/");
  };

  render() {
    const { noteId } = this.props.match.params;
    const selectedNote = this.findNoteMatch(noteId);
    const path = this.props.match.path;

    return !selectedNote ? (
      <h1>This note does not exist.</h1>
    ) : (
      <div className="note-item-main">
        <NoteBox
          title={selectedNote.name}
          id={selectedNote.id}
          date={selectedNote.modified}
          redirectOnDelete={this.redirectOnDelete}
          path={path}
        />
        <p className="note-content">{selectedNote.content}</p>
      </div>
    );
  }
}

export default NoteItemMain;
