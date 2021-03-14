import React from "react";
import NoteBox from "../NoteBox/NoteBox";
import "./NoteItemMain.css";
import NotefulContext from "../NotefulContext";
import PropTypes from "prop-types";

class NoteItemMain extends React.Component {
  static contextType = NotefulContext;

  findNoteMatch(noteId) {
    const { notes } = this.context;
    // eslint-disable-next-line
    const noteMatch = notes.find((note) => note.id == noteId);
    return noteMatch;
  }

  render() {
    const { noteId } = this.props.match.params;
    const selectedNote = this.findNoteMatch(noteId);

    return !selectedNote ? (
      <h1>This note does not exist.</h1>
    ) : (
      <div className="note-item-main">
        <NoteBox
          title={selectedNote.note_name}
          id={selectedNote.id}
          date={selectedNote.date_created}
        />
        <p className="note-content">{selectedNote.content}</p>
      </div>
    );
  }
}
NoteItemMain.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
};

export default NoteItemMain;
