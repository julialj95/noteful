import React from "react";
import { NavLink } from "react-router-dom";
import "./NotesListSidebar.css";
import NotefulContext from "../NotefulContext";
import AddFolder from "../AddFolder/AddFolder";
import PropTypes from "prop-types";
class NotesListSidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      isFormVisible: false,
    };
  }
  static contextType = NotefulContext;

  deleteFolderRequest = (folderId) => {
    fetch(`http://localhost:8000/api/folders/${folderId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        console.log(res);
      })
      .then(() => {
        // if (this.props.match.path === "/folders/:folderId") {
        return this.props.history.push("/");
      })
      .then(() => {
        this.context.deleteFolder(folderId);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { folders } = this.context;
    const folderId = Number(this.props.match.params.folderId);

    const folderList = folders.map((folder, index) => {
      return (
        <div
          className={
            folder.id === folderId ? "folderBox highlighted" : "folderBox"
          }
          key={index}
        >
          <div className="link-box">
            <NavLink to={`/folder/${folder.id}`} className="link" key={index}>
              {folder.folder_name}
            </NavLink>
          </div>
          {folderId ? (
            <div className="delete-box">
              <button
                className="delete"
                onClick={() => this.deleteFolderRequest(folderId)}
              >
                Delete Folder
              </button>
            </div>
          ) : null}
          <br />
        </div>
      );
    });
    return (
      <div className="sidebar">
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

NotesListSidebar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
};
export default NotesListSidebar;
