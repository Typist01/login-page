/** @format */

import React from "react";
import "../Form.css";

export default function ErrorPage(props) {
  return (
    <React.Fragment>
      <div className="fail-page">
        <h1>Submitted Successfully</h1>
        <p onClick={() => props.onRetry()}>click here to try again</p>
      </div>
    </React.Fragment>
  );
}
