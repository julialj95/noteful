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
        <div className="top-row">
          <Link to={`/note/${id}`}>{title}</Link>
        </div>
        <div className="bottom-row">
          <p className="item">Date modified: {formattedDate}</p>
          <button className="item, delete-button">Delete Note</button>
        </div>
      </div>
    );
  }
}
export default NoteBox;
