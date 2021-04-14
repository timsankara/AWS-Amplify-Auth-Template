import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Button, Spinner, Form } from "react-bootstrap";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      code: "",
      phone_number: "",
      loginUsername: "",
      loginPassword: "",

      confirmation_code: "",
      loginDivHidden: false,
      registerDivHidden: true,
      confirm_account_hidden: true,
    };
  }

  signUp = async (e) => {
    e.preventDefault();
    let { username, password, phone_number } = this.state;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          phone_number, // optional - E.164 number convention
          // other custom attributes
        },
      });
      console.log(user);
      this.setState({
        loginDivHidden: true,
        confirm_account_hidden: false,
        registerDivHidden: true,
      });
    } catch (error) {
      console.log("error signing up:", error);
      alert(error.message);
    }
  };

  confirmSignUp = async (e) => {
    e.preventDefault();
    let { username, confirmation_code } = this.state;
    try {
      await Auth.confirmSignUp(username, confirmation_code);
      alert("Successfully confirmed account");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  signIn = async (e) => {
    e.preventDefault();
    try {
      let { loginUsername, loginPassword } = this.state;
      const user = await Auth.signIn(loginUsername, loginPassword);
      console.log(user);
    } catch (error) {
      if (error.code === "UserNotConfirmedException") {
        alert("Please confirm your account first");
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div
            className="card boxShadow col-6 mx-auto"
            hidden={this.state.loginDivHidden}
          >
            <form onSubmit={this.signIn}>
              <h1>Sign In</h1>
              <input
                placeholder="Email"
                type="text"
                className="col-sm-7 mx-auto"
                onChange={(e) =>
                  this.setState({ loginUsername: e.target.value })
                }
              />
              <input
                placeholder="Password"
                type="password"
                className="col-sm-6 mx-auto"
                onChange={(e) =>
                  this.setState({ loginPassword: e.target.value })
                }
              />
              <button
                className="btn btn-primary my-2 col-8 mx-auto"
                type="submit"
              >
                Sign In
              </button>
            </form>
            <button
              className="btn btn-grey col-5 mx-auto"
              onClick={() =>
                this.setState({
                  loginDivHidden: true,
                  registerDivHidden: false,
                })
              }
            >
              Register
            </button>
          </div>

          <div
            className="card boxShadow col-6 mx-auto"
            hidden={this.state.confirm_account_hidden}
          >
            <form onSubmit={this.confirmSignUp}>
              <div className="row">
                <h1 className="mx-auto">Confirm Account</h1>
              </div>
              <input
                type="text"
                className="col-sm-6"
                placeholder="Enter Confirmation Code..."
                onChange={(e) =>
                  this.setState({ confirmation_code: e.target.value })
                }
              />
              <br />
              <button className="btn btn-primary" type="submit">
                Confirm Account
              </button>
            </form>
          </div>

          <div
            className="card boxShadow col-6 mx-auto"
            hidden={this.state.registerDivHidden}
          >
            <h1>Sign Up</h1>
            <form onSubmit={this.signUp}>
              <input // the email will be used as a username
                placeholder="Email"
                type="text"
                className="col-sm-7 mx-auto"
                onChange={(e) => this.setState({ username: e.target.value })}
                required
              />
              <br />
              <input
                placeholder="Phone Number"
                type="text"
                className="col-sm-6 mx-auto"
                onChange={(e) =>
                  this.setState({ phone_number: e.target.value })
                }
                required
              />
              <br />
              <input
                placeholder="Password"
                type="password"
                className="col-sm-6 mx-auto"
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
              <button
                type="submit"
                className="btn btn-primary my-2 col-8 mx-auto"
              >
                Register
              </button>
            </form>
            <button
              className="btn btn-grey"
              onClick={() =>
                this.setState({
                  loginDivHidden: false,
                  registerDivHidden: true,
                })
              }
              type="submit"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthPage;
