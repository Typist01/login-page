/** @format */
import React from "react";
import "../Form.css";

export default function SuccessPage(props) {
  return (
    <React.Fragment>
      <div className="success-page">
        <h1>Submitted successfully</h1>
        <p onClick={() => props.onRetry()}>click here to try again</p>
      </div>
    </React.Fragment>
  );
}
