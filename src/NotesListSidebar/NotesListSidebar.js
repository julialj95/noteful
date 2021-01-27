import React from "react";
import { Link } from "react-router-dom";
import "./NotesListSidebar.css";
class NotesListSidebar extends React.Component {
  render() {
    const { data } = this.props;
    const folderList = data.folders.map((folder, index) => (
      <div className="folder-box">
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
