import React from "react";
import { Link } from "react-router-dom";
import "./NotesListSidebar.css";
class NotesListSidebar extends React.Component {
  render() {
    const { folders } = this.props;

    const folderList = folders.map((folder, index) => {
      return (
        <div className="folder-box" key={index}>
          <Link to={`/folder/${folder.id}`} key={index}>
            {folder.name}
          </Link>
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

// return selectedFolder === folder.id ? (
//   <div className="hightlighted-folder-box" key={index}>
//     <Link to={`/folder/${folder.id}`} key={index}>
//       {folder.name}
//     </Link>
//     <br />
//   </div>
// ) : (
//   <div className="folder-box" key={index}>
//     <Link to={`/folder/${folder.id}`} key={index}>
//       {folder.name}
//     </Link>
//     <br />
//   </div>
// );
// });
