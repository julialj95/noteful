import React, { Fragment } from "react";
import "./AddFolder.css";
import ValidationError from "../ValidationError";

class AddFolder extends React.Component {
  constructor() {
    super();
    this.state = {
      newFolderName: "",
      touched: false,
      displayError: false,
    };
    this.createNewFolder = this.createNewFolder.bind(this);
  }
  createNewFolder(event) {
    event.preventDefault();
    fetch("http://localhost:9090/folders/", {
      method: "post",
      body: JSON.stringify({
        name: this.state.newFolderName,
      }),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return Promise.reject("404 error");
        }
        return response.json();
      })
      .then(() => {
        window.location.reload();
      })
      .catch(() => this.setState({ displayError: true }));
  }

  validateFolderName() {
    const folderName = this.state.newFolderName.trim();
    if (folderName.length === 0) {
      return "Please enter a folder name";
    }
  }

  render() {
    const { newFolderName, displayError } = this.state;
    const isEnabled = newFolderName.length > 0;
    return (
      <Fragment>
        <div id="errorDisplay">
          {displayError ? (
            <h1>Your request was unsuccessful. Please try again.</h1>
          ) : null}
        </div>
        <div className="folderForm">
          <h2>Add New Folder</h2>
          <form onSubmit={(event) => this.createNewFolder(event)}>
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
                    displayError: false,
                  })
                }
                aria-required="true"
                aria-label="Folder name for new folder"
                aria-describedby="folder-name-error"
              />
              <div id="folder-name-error">
                {this.state.touched && (
                  <ValidationError message={this.validateFolderName()} />
                )}
              </div>
            </div>
            <div className="add-folder-item">
              <button disabled={!isEnabled} type="submit">
                Create Folder
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default AddFolder;
