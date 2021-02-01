import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./NoteBox.css";
class NoteBox extends React.Component {
  static contextType = NotefulContext;

  // deleteNoteRequest = () => {
  //   const noteId = this.props.id;
  //   fetch(`http://localhost:9090/notes/${noteId}`, {
  //     method: "DELETE",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   })
  //     .then(() => {
  //       // Promise.all([this.context.deleteNote(), this.props.redirectOnDelete]);
  //       this.context.deleteNote(noteId);
  //     })

  //     .catch((error) => console.log(error));
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
        this.context.deleteNote(noteId);

        // Promise.all([
        //   this.context.deleteNote(noteId),
        //   this.props.redirectOnDelete(),
        // ]).then(([responseOne, responseTwo]) => {
        //   if (!responseOne.ok)
        //     return responseOne.json().then((e) => Promise.reject(e));
        //   if (!responseTwo.ok)
        //     return responseTwo.json().then((e) => Promise.reject(e));
        //   return [responseOne.json(), responseTwo.json()];
      })

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
export default NoteBox;
