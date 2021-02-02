import React from "react";
import { Link, withRouter } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./NoteBox.css";
import PropTypes from "prop-types";
class NoteBox extends React.Component {
  static contextType = NotefulContext;

  // redirectOnDelete = () => {
  //   // if (this.props.path === "/note/:noteId") {
  //     this.props.history.push('/')

  // };

  deleteNoteRequest = () => {
    // e.preventDefault();
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
        return this.props.history.push("/");
      })
      .then(() => {
        // this.props.history.push("/");
        this.context.deleteNote(noteId);
      })
      // this.context.deleteNote(noteId);
      // this.redirectOnDelete();

      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { title, date, id } = this.props;
    const dateObject = new Date(date);
    const formattedDate = dateObject.toDateString();
    // const { redirectOnDelete } = this.props;

    return (
      <div className="notebox">
        <div className="top-row">
          <Link to={`/note/${id}`}>{title}</Link>
        </div>
        <div className="bottom-row">
          <p className="item">Date modified: {formattedDate}</p>
          <button
            className="item delete-button"
            // onClick={redirectOnDelete}
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
  // redirectOnDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default withRouter(NoteBox);
