import React from "react";
import NotefulContext from "../NotefulContext";

class AddNote extends React.Component {
  static contextType = NotefulContext;
  constructor() {
    super();
    this.state = {
      noteFormVisible: false,
      newNoteName: "",
      newNoteContent: "Type note here...",
      newNoteModified: "",
      selectedFolder: "",
    };
    this.createNewNote = this.createNewNote.bind(this);
  }

  createNewNote(event) {
    event.preventDefault();
    const matchedFolder = this.context.folders.filter(
      (folder) => folder.name === this.state.selectedFolder
    );
    console.log(matchedFolder);
    fetch("http://localhost:9090/notes/", {
      method: "post",
      body: JSON.stringify({
        name: this.state.newNoteName,
        modified: this.state.newNoteModified,
        content: this.state.newNoteContent,
        folderId: matchedFolder.id,
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
        <form onSubmit={(event) => this.createNewNote(event)}>
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
              this.setState({ selectedFolder: event.target.value })
            }
          >
            {this.context.folders.map((folder) => {
              return (
                <option key={folder.name} value={folder.name}>
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
