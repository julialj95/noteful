import React, { Fragment } from "react";
import NotefulContext from "../NotefulContext";
import "./AddNote.css";
import ValidationError from "../ValidationError";

class AddNote extends React.Component {
  static contextType = NotefulContext;

  constructor() {
    super();
    this.state = {
      noteFormVisible: false,
      newNoteName: {
        value: "",
        touched: false,
      },
      newNoteContent: {
        value: "Type note here...",
        touched: false,
      },
      selectedFolderId: "",
      displayError: false,
    };
    this.createNewNote = this.createNewNote.bind(this);
  }

  createNewNote(event) {
    event.preventDefault();
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds() +
      ":" +
      today.getMilliseconds();
    const dateTime = new Date(date + " " + time);
    const modified = dateTime.toISOString();

    fetch("http://localhost:8000/api/notes", {
      method: "post",
      body: JSON.stringify({
        note_name: this.state.newNoteName.value,
        date_created: modified,
        folder: this.state.selectedFolderId,
        content: this.state.newNoteContent.value,
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

  validateNoteTitle() {
    const noteTitle = this.state.newNoteName.value.trim();
    if (noteTitle.length === 0) {
      return "Please enter a note name";
    }
  }

  validateNoteContent() {
    const noteContent = this.state.newNoteContent.value.trim();
    if (noteContent.length === 0) {
      return "Please enter note content";
    }
  }
  validateFolderId() {
    if (this.state.selectedFolderId === null) {
      return "***Please select a folder";
    }
  }

  render() {
    const { displayError } = this.state;
    const noteName = this.state.newNoteName.value;
    const folder = this.state.selectedFolderId;
    const isEnabled = noteName.length > 0 && folder !== "";
    return (
      <Fragment>
        {displayError ? (
          <h1>Your request was unsuccessful. Please try again.</h1>
        ) : null}
        <div className="add-note-box">
          <h2>Add New Note</h2>
          <form onSubmit={(event) => this.createNewNote(event)}>
            <ul className="flex-box">
              <div className="input">
                <li className="form-row">
                  <label htmlFor="noteName">Note Name</label>
                  <br />
                  <input
                    type="text"
                    name="noteName"
                    id="noteName"
                    onChange={(event) =>
                      this.setState({
                        newNoteName: {
                          value: event.target.value,
                          touched: true,
                        },
                      })
                    }
                    aria-label="Name for new note"
                    aria-required="true"
                    aria-describedby="note-title-error"
                  />
                  <div id="note-title-error">
                    {this.state.newNoteName.touched && (
                      <ValidationError message={this.validateNoteTitle()} />
                    )}
                  </div>
                </li>

                <li className="form-row">
                  <label>
                    Folder
                    <br />
                    <select
                      value={this.state.selectedFolderId}
                      onChange={(event) =>
                        this.setState({ selectedFolderId: event.target.value })
                      }
                      aria-label="Select a folder from the list"
                      aria-required="true"
                    >
                      <option value={""}>Select a folder</option>
                      {this.context.folders.map((folder) => {
                        return (
                          <option
                            key={folder.id}
                            value={folder.id}
                            aria-label={folder.folder_name}
                          >
                            {folder.folder_name}
                          </option>
                        );
                      })}
                    </select>
                    <ValidationError message={this.validateFolderId()} />
                  </label>
                </li>
              </div>
              <div className="content">
                <li className="form-row">
                  <label>
                    Note Content
                    <br />
                    <textarea
                      value={this.state.newNoteContent.value}
                      onChange={(event) =>
                        this.setState({
                          newNoteContent: {
                            value: event.target.value,
                            touched: true,
                          },
                        })
                      }
                      aria-label="Content of the new note"
                      aria-required="false"
                      aria-describedby="note-content-error"
                    />
                    <div id="note-content-error">
                      {this.state.newNoteContent.touched && (
                        <ValidationError message={this.validateNoteContent()} />
                      )}
                    </div>
                  </label>
                </li>
              </div>
            </ul>
            <div className="button-box">
              <button
                disabled={!isEnabled}
                className="submit-button"
                type="submit"
              >
                Create Note
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default AddNote;
