import React from "react";

class NoteItemSidebar extends React.Component {
  render() {
    const { folderName } = this.props;
    return (
      <>
        <button>Go Back</button>
        <h1>{folderName}</h1>
      </>
    );
  }
}

export default NoteItemSidebar;
