import React from "react";
import { Link } from "react-router-dom";
import "./NotesListSidebar.css";
import dummystore from "../dummystore";
class NotesListSidebar extends React.Component {
  render() {
    const { folders } = dummystore;
    const folderList = folders.map((folder, index) => (
      <div className="folder-box" key={index}>
        <Link to={`/folder/${folder.id}`} key={index}>
          {folder.name}
        </Link>
        <br />
      </div>
    ));
    return (
      <>
        {folderList}
        <button>+ Add New Folder</button>
      </>
    );
  }
}

export default NotesListSidebar;
