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
      // newNoteName: {
      //   value: "",
      //   touched: false,
      // },
      newNoteName: "",
      // newNoteContent: {
      //   value: "Type note here...",
      //   touched: false,
      // },
      newNoteContent: "",
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
        name: this.state.newNoteName,
        modified: modified,
        content: this.state.newNoteContent,
        folderId: this.state.selectedFolderId,
      }),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
  }

  validateNoteTitle() {
    const noteTitle = this.state.newNoteName.trim();
    if (noteTitle.length === 0) {
      return "Please enter a note name";
    }
  }

  validateNoteContent() {
    const noteContent = this.state.newNoteContent.trim();
    if (noteContent.length === 0) {
      return "Please enter note content";
    }
  }
  validateFolderId() {
    if (this.state.selectedFolderId === "") {
      return "Please select a folder";
    }
  }

  render() {
    return (
      <div className="noteForm">
        <h2>Add New Note</h2>
        <form onSubmit={() => this.createNewNote()}>
          <label htmlFor="noteName">Note Name:</label>
          <input
            type="text"
            name="noteName"
            id="noteName"
            onChange={(event) =>
              this.setState({
                newNoteName: event.target.value,
              })
            }
          />
          {/* {this.state.newNoteName.touched && ( */}
          <ValidationError message={this.validateNoteTitle()} />
          {/* )} */}
          <br />

          <label>
            Note Content:
            <textarea
              value={this.state.newNoteContent}
              onChange={(event) =>
                this.setState({
                  newNoteContent: event.target.value,
                })
              }
            />
            {/* {this.state.newNoteContent.touched && ( */}
            <ValidationError message={this.validateNoteContent()} />
            {/* )} */}
          </label>
          <br />
          <label>
            Select Folder:
            <select
              value={this.state.selectedFolderId}
              onChange={(event) =>
                this.setState({ selectedFolderId: event.target.value })
              }
            >
              <option value={""}>Select a folder from the list</option>
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
          <br />

          <button type="submit">Create Note</button>
        </form>
      </div>
    );
  }
}

export default AddNote;
