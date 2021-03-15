import React from "react";
import { Link, withRouter } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./NoteBox.css";
import PropTypes from "prop-types";
class NoteBox extends React.Component {
  static contextType = NotefulContext;

  deleteNoteRequest = (e, noteId) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
      })
      .then(() => {
        if (this.props.match.path === "/note/:noteId") {
          return this.props.history.push("/");
        }
      })
      .then(() => {
        this.context.deleteNote(noteId);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  editNoteRequest = (e, noteId) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        res.json();
      })
      .then(() => {
        this.context.updateNote(noteId);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { title, date, id } = this.props;
    const dateObject = new Date(date);
    const formattedDate = dateObject.toDateString();

    return (
      <div className="notebox">
        <div className="top-row">
          <Link className="link" to={`/note/${id}`}>
            {title}
          </Link>
        </div>
        <div className="bottom-row">
          <p className="date item">Date modified: {formattedDate}</p>
          {this.props.match.path === "/note/:noteId" ? (
            <button
              className="item edit-button"
              onClick={(e) => this.editNoteRequest(e, id)}
            >
              Edit Note
            </button>
          ) : null}
          <button
            className="item delete-button"
            onClick={(e) => this.deleteNoteRequest(e, id)}
          >
            Delete Note
          </button>
        </div>
      </div>
    );
  }
}
NoteBox.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
};

export default withRouter(NoteBox);
