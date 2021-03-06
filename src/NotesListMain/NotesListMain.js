import React from "react";
import NoteBox from "../NoteBox/NoteBox";
import "./NotesListMain.css";
import NotefulContext from "../NotefulContext";
import AddNote from "../AddNote/AddNote";
import ErrorComponent from "../ErrorComponent";
import PropTypes from "prop-types";

class NotesListMain extends React.Component {
  static contextType = NotefulContext;
  constructor() {
    super();
    this.state = {
      noteFormVisible: false,
    };
  }

  findNotesForFolder(folderId) {
    const { notes } = this.context;
    const info = !folderId
      ? notes
      : notes.filter((note) => note.folder === folderId);
    return info;
  }

  render() {
    const folderId = Number(this.props.match.params.folderId);
    const notesList = this.findNotesForFolder(folderId);
    const filteredNotes = notesList.map((item, index) => (
      <NoteBox
        key={index}
        title={item.note_name}
        date={item.date_created}
        id={item.id}
      />
    ));
    return (
      <div className="notes-container">
        <div className="noteslist">{filteredNotes}</div>
        <button
          className="add-button"
          onClick={() => this.setState({ noteFormVisible: true })}
        >
          Add new note +
        </button>
        <ErrorComponent>
          {this.state.noteFormVisible ? <AddNote /> : null}
        </ErrorComponent>
      </div>
    );
  }
}
NotesListMain.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};
export default NotesListMain;
