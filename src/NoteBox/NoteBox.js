import React from "react";
import { Link } from "react-router-dom";
import "./NoteBox.css";

class NoteBox extends React.Component {
  render() {
    const { title, date, id } = this.props;
    return (
      <div class="notebox">
        <Link to={`/note/${id}`}>{title}</Link>
        <div className="bottom-row">
          <p>{date}</p>
          <button>Delete Note</button>
        </div>
      </div>
    );
  }
}
export default NoteBox;
