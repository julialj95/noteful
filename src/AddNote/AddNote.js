import React from "react";
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
    };
    this.createNewNote = this.createNewNote.bind(this);
  }

  createNewNote() {
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

    fetch("http://localhost:9090/notes/", {
      method: "post",
      body: JSON.stringify({
        name: this.state.newNoteName.value,
        modified: modified,
        content: this.state.newNoteContent.value,
        folderId: this.state.selectedFolderId,
      }),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
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
    if (this.state.selectedFolderId === "") {
      return "***Please select a folder";
    }
  }

  render() {
    return (
      <div className="add-note-box">
        <h2>Add New Note</h2>
        <form onSubmit={() => this.createNewNote()}>
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
                />
                {this.state.newNoteName.touched && (
                  <ValidationError message={this.validateNoteTitle()} />
                )}
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
                  >
                    <option value={""}>Select a folder</option>
                    {this.context.folders.map((folder) => {
                      return (
                        <option key={folder.id} value={folder.id}>
                          {folder.name}
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
                  />
                  {this.state.newNoteContent.touched && (
                    <ValidationError message={this.validateNoteContent()} />
                  )}
                </label>
              </li>
            </div>
          </ul>
          <div className="button-box">
            <button className="submit-button" type="submit">
              Create Note
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNote;
