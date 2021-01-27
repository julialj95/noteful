import React from "react";
import { Link } from "react-router-dom";
import "./NoteBox.css";

class NoteBox extends React.Component {
  render() {
    const { title, date, id } = this.props;
    const dateObject = new Date(date);
    const formattedDate = dateObject.toDateString();
    return (
      <div className="notebox">
        <Link to={`/note/${id}`}>{title}</Link>
        <div className="bottom-row">
          <p>Date modified: {formattedDate}</p>
          <button>Delete Note</button>
        </div>
      </div>
    );
  }
}
export default NoteBox;
