/** @format */
import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import SuccessPage from "./ComponentPages/SuccessPage";
import ErrorPage from "./ComponentPages/ErrorPage";

export default function Login() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });

  const [inputIsValid, setInputIsValid] = useState({
    firstName: false,
    lastName: false,
    age: false,
    email: false,
  });
  const [showErrors, setShowErrors] = useState(false);

  const [disableInputs, setDisableInputs] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  //updates validators and returns true if all valid
  function inputValidator() {
    userDetails.firstName.length > 0
      ? setInputIsValid((v) => ({ ...v, firstName: true }))
      : setInputIsValid((v) => ({ ...v, firstName: false }));

    userDetails.lastName.length > 0
      ? setInputIsValid((v) => ({ ...v, lastName: true }))
      : setInputIsValid((v) => ({ ...v, lastName: false }));
    userDetails.age.length > 0 && parseInt(userDetails.age) > 0
      ? setInputIsValid((v) => ({ ...v, age: true }))
      : setInputIsValid((v) => ({ ...v, age: false }));

    userDetails.email.length > 5 && userDetails.email.includes("@")
      ? setInputIsValid((v) => ({ ...v, email: true }))
      : setInputIsValid((v) => ({ ...v, email: false }));
  }

  function validateForm() {
    if (
      inputIsValid.firstName &&
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
  useEffect(() => {
    console.log("env api:\n" + process.env.REACT_APP_API);
    axios.get(process.env.REACT_APP_API).then((data) => {
      console.log("api data: \n");
      console.log(data.data);
    });
  }, []);
  function submitHandler(e) {
    e.preventDefault();

    setDisableInputs(true);
    console.log(e);
    if (formIsValid) {
      const postBody = {
        ...userDetails,
        age: parseInt(userDetails.age),
      };
      axios.post(process.env.REACT_APP_API, postBody).then((data) => {
        console.log(data);
        console.log(data.status);
        if (data.status == 201) {
          setSuccess(true);
        } else {
          setFail(true);
        }
      });
      console.log("form is valid");
    } else {
      console.log("showing errors");
      setShowErrors(true);
      setDisableInputs(false);
    }
  }

  function InvalidStatement({ isValid }) {
    if (showErrors && !isValid) {
      return (
        <p style={{ fontSize: "14px", color: "red", marginTop: 0 }}>
          Invalid Input
        </p>
      );
    } else {
      return null;
    }
  }

  function handleReset() {
    setUserDetails({
      firstName: "",
      lastName: "",
      age: "",
      email: "",
    });
    setShowErrors(false);
    setDisableInputs(false);
    setSuccess(false);
    setFail(false);
  }
  if (success) {
    return <SuccessPage onRetry={handleReset} />;
  }
  if (fail) {
    return <ErrorPage onRetry={handleReset} />;
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
          type="email"
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
