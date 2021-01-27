import React from "react";

class NoteItemSidebar extends React.Component {
  render() {
    const { folder } = this.props;
    return (
      <>
        <button>Go Back</button>
        <h1>{folder}</h1>
      </>
    );
  }
}

export default NoteItemSidebar;
