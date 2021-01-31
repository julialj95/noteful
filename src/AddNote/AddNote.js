import React from "react";
import NotefulContext from "../NotefulContext";
import "./AddNote.css";

class AddNote extends React.Component {
  static contextType = NotefulContext;
  constructor() {
    super();
    this.state = {
      noteFormVisible: false,
      newNoteName: "",
      newNoteContent: "Type note here...",
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
              this.setState({ newNoteName: event.target.value })
            }
          />
          <br />

          <label>
            Note Content:
            <textarea
              value={this.state.newNoteContent}
              onChange={(event) =>
                this.setState({ newNoteContent: event.target.value })
              }
            />
          </label>
          <br />
          <select
            onChange={(event) =>
              this.setState({ selectedFolderId: event.target.value })
            }
          >
            {this.context.folders.map((folder) => {
              return (
                <option key={folder.name} value={folder.id}>
                  {folder.name}
                </option>
              );
            })}
          </select>

          <button type="submit">Create Note</button>
        </form>
      </div>
    );
  }
}

export default AddNote;
