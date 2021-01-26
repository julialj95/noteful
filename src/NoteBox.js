import React from "react";

class NoteBox extends React.Component {
  render() {
    const { title, date } = this.props;
    return (
      <div class="notebox">
        <h1>{title}</h1>
        <p>{date}</p>
        <button>Delete Note</button>
      </div>
    );
  }
}
export default NoteBox;
