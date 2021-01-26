import React from "react";
import NoteBox from "../NoteBox";

class NotesListMain extends React.Component {
  render() {
    const { data } = this.props;
    const notes = data.notes.map((item, index) => (
      <NoteBox key={index} title={item.name} date={item.modified} />
    ));
    return <div className="noteslist">{notes}</div>;
  }
}

export default NotesListMain;
