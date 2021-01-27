import React from "react";
import NoteBox from "../NoteBox/Notebox";

class NoteItemMain extends React.Component {
  render() {
    const { content } = this.props;
    return (
      <>
        <NoteBox />
        <p>{content}</p>
      </>
    );
  }
}
export default NoteItemMain;
