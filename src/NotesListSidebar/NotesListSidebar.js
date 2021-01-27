import React from "react";
import { NavLink } from "react-router-dom";
import "./NotesListSidebar.css";
class NotesListSidebar extends React.Component {
  render() {
    const { folders } = this.props;

    const folderList = folders.map((folder, index) => {
      return (
        <div className="folder-box" key={index}>
          <NavLink
            to={`/folder/${folder.id}`}
            activeStyle={{ color: "navy", backgroundColor: "red" }}
            key={index}
          >
            {folder.name}
          </NavLink>
          <br />
        </div>
      );
    });
    return (
      <>
        {folderList}
        <button>+ Add New Folder</button>
      </>
    );
  }
}

export default NotesListSidebar;
