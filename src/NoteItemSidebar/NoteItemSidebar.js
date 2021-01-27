import React from "react";
import { NavLink } from "react-router-dom";
import "./NoteItemSidebar.css";

class NoteItemSidebar extends React.Component {
  render() {
    const { folderName, folderId } = this.props;
    return (
      <div className="note-item-sidebar">
        <button className="back-button">Go Back</button>
        <br />
        <NavLink to={`/folder/${folderId}`} className="folder-name">
          {folderName}
        </NavLink>
      </div>
    );
  }
}

export default NoteItemSidebar;
