import React from "react";
import NoteBox from "../NoteBox/NoteBox";
import "./NotesListMain.css";

class NotesListMain extends React.Component {
  render() {
    // const { notesList } = this.props;
    const { notes } = this.props;
    const filteredNotes = notes.map((item, index) => (
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
