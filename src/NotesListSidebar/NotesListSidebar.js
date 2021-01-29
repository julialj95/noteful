import React from "react";
import { NavLink } from "react-router-dom";
import "./NotesListSidebar.css";
class NotesListSidebar extends React.Component {
  render() {
    const { folders, selectedFolderId } = this.props;

    const folderList = folders.map((folder, index) => {
      return (
        <div
          className={
            folder.id === selectedFolderId
              ? "folder-box highlighted"
              : "folder-box"
          }
          key={index}
        >
          <NavLink
            to={`/folder/${folder.id}`}
            activeStyle={{ color: "white", backgroundColor: "navy" }}
            key={index}
          >
            {folder.name}
          </NavLink>
          <br />
        </div>
      );
    });
    return (
      <div className="notes-sidebar">
        {folderList}
        <button className="add-folder-button">+ Add New Folder</button>
      </div>
    );
  }
}

export default NotesListSidebar;
