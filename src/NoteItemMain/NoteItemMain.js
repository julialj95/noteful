import React from "react";

class NoteItemMain extends React.Component {
  render() {
    return (
      <>
        <div className="note-box">
          <h1>Note Title</h1>
          <p>Date created</p>
          <button>Delete Note</button>
        </div>
        <p>Note content</p>
      </>
    );
  }
}
export default NoteItemMain;
