import React from "react";
import NoteBox from "../NoteBox/NoteBox";
import "./NoteItemMain.css";

class NoteItemMain extends React.Component {
  render() {
    const { note } = this.props;
    console.log(note);
    return (
      <div className="note-item-main">
        <NoteBox title={note.name} id={note.id} date={note.modified} />
        <p className="note-content">{note.content}</p>
      </div>
    );
  }
}
export default NoteItemMain;
