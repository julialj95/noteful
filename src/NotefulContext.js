import React from "react";

const NotefulContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
  deleteFolder: () => {},
  updateNote: () => {},
});

export default NotefulContext;
