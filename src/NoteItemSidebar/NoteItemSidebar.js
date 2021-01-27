import React from "react";
import { NavLink } from "react-router-dom";

class NoteItemSidebar extends React.Component {
  render() {
    const { folderName, folderId } = this.props;
    return (
      <>
        <button>Go Back</button>
        <NavLink to={`/folder/${folderId}`}>{folderName}</NavLink>
      </>
    );
  }
}

export default NoteItemSidebar;
