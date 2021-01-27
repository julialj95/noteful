import React from "react";
import NoteBox from "../NoteBox/NoteBox";

class NotesListMain extends React.Component {
  render() {
    const { data } = this.props;
    const notes = data.notes.filter(
      (note) => note.folderId === selectedFolder.id
    );
    //figure out selected folder
    const filteredNotes = notes.map((item, index) => (
      <NoteBox
        key={index}
        title={item.name}
        date={item.modified}
        id={item.id}
      />
    ));
    return <div className="noteslist">{filteredNotes}</div>;
  }
}

export default NotesListMain;
