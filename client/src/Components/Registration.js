import React, { useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import axios from "axios";

const Registration = () => {
  const [formDetails, setFormDetails] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
  });

  //when submit button is pressed send information to register route
  //see ../../../routes/userOperationsRoutes.js
  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      let res = await axios.post("/user/register", formDetails);
      console.log(res);
      if (res.status != 200) {
        M.toast({ html: res.data.msg });
      }
      M.toast({ html: res.data.msg, displayLength: 3000 });
    } catch (err) {
      console.log(err.response.data);
      err.response.data.errors.forEach((element) => {
        M.toast({ html: element.msg });
      });
    }
  };

  //updates the state as the form information changes
  const onChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    // console.log(formDetails);
  };
  return (
    <>
      <div className="form-container">
        <h1>Registration</h1>
        <form className="col s12">
          <div className="form-group">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input
                placeholder="Placeholder"
                name="username"
                id="username"
                type="text"
                className="validate"
                value={formDetails.username}
                onChange={onChange}
                required
              ></input>
              <label htmlFor="username">Username:</label>
            </div>
          </div>
          <div className="form-group">
            <div className="input-field col s6">
              <i className="material-icons prefix">lock_outline</i>
              <input
                id="password"
                name="password"
                type="password"
                className="validate"
                value={formDetails.password}
                onChange={onChange}
                required
              ></input>
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-group">
              <div className="input-field col s6">
                <i className="material-icons prefix">lock</i>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  className="validate"
                  value={formDetails.passwordConfirm}
                  onChange={onChange}
                  required
                ></input>
                <label htmlFor="passwordConfirm">Confirm Password</label>
              </div>
            </div>
            <div className="form-group">
              <div className="input-field col s6">
                <i className="material-icons prefix">email</i>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="validate"
                  value={formDetails.email}
                  onChange={onChange}
                  required
                ></input>
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <button
              className="btn waves-effect waves-light"
              type="Submit"
              name="action"
              onClick={onSubmit}
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Registration;
