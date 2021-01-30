import React from "react";
import { NavLink } from "react-router-dom";
import "./NotesListSidebar.css";
import NotefulContext from "../NotefulContext";
class NotesListSidebar extends React.Component {
  static contextType = NotefulContext;
  render() {
    const { folders } = this.context;
    const { folderId } = this.props.match.params;

    const folderList = folders.map((folder, index) => {
      return (
        <div
          className={
            folder.id === folderId ? "folder-box highlighted" : "folder-box"
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
