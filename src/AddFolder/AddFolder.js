import React from "react";
import "./AddFolder.css";

class AddFolder extends React.Component {
  constructor() {
    super();
    this.state = {
      newFolderName: "",
    };
    this.createNewFolder = this.createNewFolder.bind(this);
  }
  createNewFolder() {
    fetch("http://localhost:9090/folders/", {
      method: "post",
      body: JSON.stringify({
        name: this.state.newFolderName,
      }),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
  }
  render() {
    return (
      <div className="folderForm">
        <h2>Add New Folder</h2>
        <form onSubmit={() => this.createNewFolder()}>
          <label htmlFor="folderName">Folder Name:</label>
          <input
            type="text"
            name="folderName"
            id="folderName"
            onChange={(event) =>
              this.setState({ newFolderName: event.target.value })
            }
          />
          <br />

          <button type="submit">Create Folder</button>
        </form>
      </div>
    );
  }
}

export default AddFolder;
