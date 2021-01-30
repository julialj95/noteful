import React from "react";
import NoteBox from "../NoteBox/NoteBox";
import "./NotesListMain.css";
import NotefulContext from "../NotefulContext";

class NotesListMain extends React.Component {
  static contextType = NotefulContext;

  findNotesForFolder(folderId) {
    const { notes } = this.context;
    const info = !folderId
      ? notes
      : notes.filter((note) => note.folderId === folderId);
    return info;
  }

  render() {
    const { folderId } = this.props.match.params;
    const notesList = this.findNotesForFolder(folderId);
    const filteredNotes = notesList.map((item, index) => (
      <NoteBox
        key={index}
        title={item.name}
        date={item.modified}
        id={item.id}
      />
    ));
    return (
      <div className="notes-container">
        <div className="noteslist">{filteredNotes}</div>
        <button className="add-button">Add new note +</button>
      </div>
    );
  }
}

export default NotesListMain;
