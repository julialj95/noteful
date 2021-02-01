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
    this.props.history.push("/");
  };

  render() {
    const { noteId } = this.props.match.params;
    console.log(noteId);
    const selectedNote = this.findNoteMatch(noteId);
    console.log(this.props.history);
    console.log(this.props.match.path);
    return (
      <div className="note-item-main">
        <NoteBox
          title={selectedNote.name}
          id={selectedNote.id}
          date={selectedNote.modified}
          redirectOnDelete={this.redirectOnDelete}
        />
        <p className="note-content">{selectedNote.content}</p>
      </div>
    );
  }
}
export default NoteItemMain;
