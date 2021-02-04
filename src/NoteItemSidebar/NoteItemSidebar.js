import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./NoteItemSidebar.css";
import NotefulContext from "../NotefulContext";
import PropTypes from "prop-types";
class NoteItemSidebar extends React.Component {
  static contextType = NotefulContext;

  findFolderMatch(note) {
    const { notes, folders } = this.context;
    const noteItem = notes.find((item) => item.id === note.id);
    const folderId = noteItem.folderId;
    const folderMatch = folders.find((folder) => folder.id === folderId);
    return folderMatch;
  }

  findNoteMatch(noteId) {
    const { notes } = this.context;
    const noteMatch = notes.find((note) => note.id === noteId);
    return noteMatch;
  }

  render() {
    const { noteId } = this.props.match.params;
    const note = this.findNoteMatch(noteId);
    let matchedFolder;
    let folderId;
    if (note) {
      matchedFolder = this.findFolderMatch(note);
      folderId = matchedFolder.id;
    }

    return note ? (
      <div className="sidebar">
        <NavLink to={`/folder/${folderId}`} className="folder-box">
          {matchedFolder.name}
        </NavLink>
        <br />
        <button
          className="back-button"
          onClick={() => this.props.history.push(`/folder/${folderId}`)}
        >
          Go Back
        </button>
      </div>
    ) : null;
  }
}

NoteItemSidebar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  history: PropTypes.object.isRequired,
};
export default withRouter(NoteItemSidebar);
