import React from "react";
import { NavLink } from "react-router-dom";
import "./NoteItemSidebar.css";
import NotefulContext from "../NotefulContext";
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
      <div className="note-item-sidebar">
        <button className="back-button">Go Back</button>
        <br />
        <NavLink to={`/folder/${folderId}`} className="folder-name">
          {matchedFolder.name}
        </NavLink>
      </div>
    ) : null;
  }
}

export default NoteItemSidebar;

//check find folder match function (may be redundant with folderId and foldermatch basically meaning the same thing?)
