import React from "react";
import NoteBox from "../NoteBox/NoteBox";

class NoteItemMain extends React.Component {
  render() {
    const { note } = this.props;
    console.log(note);
    return (
      <>
        <NoteBox title={note.name} id={note.id} date={note.modified} />
        <p>{note.content}</p>
      </>
    );
  }
}
export default NoteItemMain;
