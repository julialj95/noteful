import React from "react";

class ErrorComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h2>There has been an error.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorComponent;
