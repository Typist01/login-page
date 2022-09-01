/** @format */
import React, { useEffect, useState } from "react";
import "./Login.css";

export default function Login() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });

  const [inputIsValid, setInputIsValid] = useState({
    userName: false,
    lastName: false,
    age: false,
    email: false,
  });
  const [showErrors, setShowErrors] = useState(false);

  const [disableInputs, setDisableInputs] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

  //updates validators and returns true if all valid
  function inputValidator() {
    userDetails.firstName.length > 0
      ? setInputIsValid((v) => ({ ...v, userName: true }))
      : setInputIsValid((v) => ({ ...v, userName: false }));

    userDetails.lastName.length > 0
      ? setInputIsValid((v) => ({ ...v, lastName: true }))
      : setInputIsValid((v) => ({ ...v, lastName: false }));
    userDetails.age.length > 0 && parseInt(userDetails.age) > 0
      ? setInputIsValid((v) => ({ ...v, age: true }))
      : setInputIsValid((v) => ({ ...v, age: false }));

    userDetails.email.length > 6 && userDetails.email.includes("@")
      ? setInputIsValid((v) => ({ ...v, email: true }))
      : setInputIsValid((v) => ({ ...v, email: false }));
  }

  function validateForm() {
    if (
      inputIsValid.userName &&
      inputIsValid.lastName &&
      inputIsValid.age &&
      inputIsValid.email
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }

  useEffect(() => {
    console.log("userDetails useEffect running");
    const timerId = setTimeout(() => {
      inputValidator();
      console.log(userDetails);
    }, 300);
    return () => {
      clearTimeout(timerId);
    };
  }, [userDetails]);

  useEffect(() => {
    console.log(inputIsValid);
    validateForm();
  }, [inputIsValid]);

  function handleFormUpdate(e) {
    const name = e.target.name;
    const val = e.target.value;
    if (name == "firstName") {
      setUserDetails((v) => ({ ...v, firstName: val }));
    }
    if (name == "lastName") {
      setUserDetails((v) => ({ ...v, lastName: val }));
    }
    if (name == "age") {
      setUserDetails((v) => ({ ...v, age: val }));
    }
    if (name == "email") {
      setUserDetails((v) => ({ ...v, email: val }));
    }
  }
  function submitHandler(e) {
    e.preventDefault();
    setDisableInputs(true);
    console.log(e);
    if (formIsValid) {
      console.log("form is valid");
    } else {
      console.log("showing errors");
      setShowErrors(true);
    }
  }

  function InvalidStatement({ isValid }) {
    if (showErrors && !isValid) {
      return <p>Invalid Input</p>;
    } else {
      return null;
    }
  }
  return (
    <React.Fragment>
      <form className="form-container" onSubmit={submitHandler}>
        <label className="form-label">First Name</label>
        <input
          disabled={disableInputs}
          className="form-input"
          name="firstName"
          value={userDetails.firstName}
          onChange={handleFormUpdate}
        />
        <InvalidStatement isValid={inputIsValid.firstName} />
        <label className="form-label">Last Name</label>
        <input
          disabled={disableInputs}
          className="form-input"
          name="lastName"
          value={userDetails.lastName}
          onChange={handleFormUpdate}
        />
        <InvalidStatement isValid={inputIsValid.lastName} />
        <label className="form-label">Age</label>
        <input
          disabled={disableInputs}
          className="form-input"
          name="age"
          type="number"
          value={userDetails.age}
          onChange={handleFormUpdate}
        />
        <InvalidStatement isValid={inputIsValid.age} />

        <label className="form-label">email</label>
        <input
          disabled={disableInputs}
          className="form-input"
          name="email"
          value={userDetails.email}
          onChange={handleFormUpdate}
        />
        <InvalidStatement isValid={inputIsValid.email} />

        <button
          className={`form-submit-button ${formIsValid ? null : "disabled"}`}
          type="submit"
        >
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}
