import React from "react";
import "./AddFolder.css";
import ValidationError from "../ValidationError";

class AddFolder extends React.Component {
  constructor() {
    super();
    this.state = {
      newFolderName: "",
      touched: false,
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

  validateFolderName() {
    const folderName = this.state.newFolderName.trim();
    if (folderName.length === 0) {
      return "Please enter a folder name";
    }
  }

  render() {
    return (
      <div className="folderForm">
        <h2>Add New Folder</h2>
        <form onSubmit={() => this.createNewFolder()}>
          <div className="add-folder-item">
            <label htmlFor="folderName">Folder Name</label>
            <br />
            <input
              type="text"
              name="folderName"
              id="folderName"
              onChange={(event) =>
                this.setState({
                  newFolderName: event.target.value,
                  touched: true,
                })
              }
            />
            {this.state.touched && (
              <ValidationError message={this.validateFolderName()} />
            )}
          </div>
          {/* <br /> */}
          <div className="add-folder-item">
            <button type="submit">Create Folder</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddFolder;
