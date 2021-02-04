import React from "react";
import { Link, withRouter } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./NoteBox.css";
import PropTypes from "prop-types";
class NoteBox extends React.Component {
  static contextType = NotefulContext;

  deleteNoteRequest = () => {
    const noteId = this.props.id;

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
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
        console.log(error);
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
          <button
            className="item delete-button"
            onClick={this.deleteNoteRequest}
          >
            Delete Note
          </button>
        </div>
      </div>
    );
  }
}
NoteBox.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
};

export default withRouter(NoteBox);
