import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./NoteBox.css";

// function onClickFunctions(id, contextDelete, redirectDeleteFunction) {
//   deleteNoteRequest(id, contextDelete);
//   redirectDeleteFunction();
// }
class NoteBox extends React.Component {
  static contextType = NotefulContext;

  deleteNoteRequest(event, noteId, callback) {
    event.preventDefault();
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw error;
          });
        }
        return response.json();
      })
      .then(() => {
        callback(noteId);
      })

      .catch((error) => console.log(error));
  }

  clickFunctions(event, onDeleteNote, id, contextDeleteNote) {
    this.deleteNoteRequest(event, id, contextDeleteNote);
    onDeleteNote();
  }

  render() {
    const { title, date, id, onDeleteNote } = this.props;
    const dateObject = new Date(date);
    const formattedDate = dateObject.toDateString();
    const contextDeleteNote = this.context.deleteNote;

    return (
      <div className="notebox">
        <div className="top-row">
          <Link to={`/note/${id}`}>{title}</Link>
        </div>
        <div className="bottom-row">
          <p className="item">Date modified: {formattedDate}</p>
          <button
            className="item delete-button"
            onClick={
              (event) =>
                this.clickFunctions(event, onDeleteNote, id, contextDeleteNote)
              // this.deleteNoteRequest(event, id, this.context.deleteNote)
            }
            // onClick={() => deleteNote}
          >
            Delete Note
          </button>
        </div>
      </div>
    );
  }
}
export default NoteBox;
