import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./NoteBox.css";

function deleteNoteRequest(noteId, callback) {
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
    .then((data) => {
      callback(noteId);
    })
    .catch((error) => console.log(error));
}
class NoteBox extends React.Component {
  static contextType = NotefulContext;
  render() {
    const { title, date, id } = this.props;
    const dateObject = new Date(date);
    const formattedDate = dateObject.toDateString();
    return (
      <div className="notebox">
        <div className="top-row">
          <Link to={`/note/${id}`}>{title}</Link>
        </div>
        <div className="bottom-row">
          <p className="item">Date modified: {formattedDate}</p>
          <button
            className="item delete-button"
            onClick={() => deleteNoteRequest(id, this.context.deleteNote)}
          >
            Delete Note
          </button>
        </div>
      </div>
    );
  }
}
export default NoteBox;
