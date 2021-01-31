import React from "react";
import { NavLink } from "react-router-dom";
import "./NotesListSidebar.css";
import NotefulContext from "../NotefulContext";
import AddFolder from "../AddFolder/AddFolder";
class NotesListSidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      isFormVisible: false,
    };
  }
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
        <button
          className="add-folder-button"
          onClick={() => this.setState({ isFormVisible: true })}
        >
          + Add New Folder
        </button>
        {this.state.isFormVisible ? <AddFolder /> : null}
      </div>
    );
  }
}

export default NotesListSidebar;
