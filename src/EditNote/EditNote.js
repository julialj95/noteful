import React from "react";
import { withRouter } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import ValidationError from "../ValidationError";
import config from "../config";

class EditNote extends React.Component {
  static contextType = NotefulContext;
  constructor(props) {
    super(props);
    this.state = {
      note_name: "",
      folder: "",
      content: "",
    };
  }

  componentDidMount() {
    const { id } = this.props;

    fetch(config.API_NOTES_ENDPOINT + `/${id}`, {
      method: "GET",
      headers: {
        type: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((event) => Promise.reject(event));
        }
        return res.json();
      })
      .then((data) =>
        this.setState({
          note_name: data.note_name,
          date_created: data.date_created,
          folder: data.folder,
          content: data.content,
        })
      )
      .catch((error) => console.error({ error }));
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  updateNote = (event) => {
    event.preventDefault();
    const { id } = this.props;

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

    const newNote = {
      id: id,
      note_name: this.state.note_name,
      date_created: modified,
      folder: this.state.folder,
      content: this.state.content,
    };

    fetch(config.API_NOTES_ENDPOINT + `/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) res.json().then((error) => Promise.reject(error));
      })
      .then(() => {
        this.context.updateNote(newNote);
        this.props.history.push("/");
      })
      .catch((error) => console.error({ error }));
  };

  validateNoteTitle = () => {
    const noteTitle = this.state.note_name.trim();
    if (noteTitle.length === 0) {
      return "Please enter a note name";
    }
  };

  validateNoteContent = () => {
    const noteContent = this.state.content.trim();
    if (noteContent.length === 0) {
      return "Please enter note content";
    }
  };
  validateFolderId = () => {
    if (this.state.folder === null) {
      return "***Please select a folder";
    }
  };

  render() {
    const { note_name, folder, content } = this.state;
    return (
      <div className="add-note-box">
        <h2>Edit Note</h2>
        <form onSubmit={(event) => this.updateNote(event)}>
          <ul className="flex-box">
            <div className="input">
              <li className="form-row">
                <label htmlFor="note_name">Note Name</label>
                <br />
                <input
                  type="text"
                  name="note_name"
                  id="note_name"
                  value={note_name}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                  aria-label="Updated note name"
                  aria-required="true"
                  aria-describedby="note-title-error"
                />
                <div id="note-title-error">
                  <ValidationError message={this.validateNoteTitle()} />
                </div>
              </li>

              <li className="form-row">
                <label>
                  Folder
                  <br />
                  <select
                    value={folder}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
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
                    value={content}
                    name="content"
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    aria-label="Updated note content"
                    aria-required="false"
                    aria-describedby="note-content-error"
                  />
                  <div id="note-content-error">
                    <ValidationError message={this.validateNoteContent()} />
                  </div>
                </label>
              </li>
            </div>
          </ul>
          <div className="button-box">
            <button className="submit-button" type="submit">
              Submit Changes
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(EditNote);
