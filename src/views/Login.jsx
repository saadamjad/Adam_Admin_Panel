import React, { Component } from "react";
import { connect } from "react-redux";
import { Login } from "Store/actions";

class Login1 extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  // ----------------------------

  // AMDIN EMAIL: admin@admin.com
  // PASSWORD: admin1234

  // ---------------------------
  onLogin = () => {
    let { email, password } = this.state;
    if (email !== "" || password !== "") {
      // console.log(firebase)
      // let db  = firebase.firestore();
      // db.collection()
      if (email == "admin@admin.com") {
        let data = {
          email,
          password
        };
        // alert("run");
        this.props.login(data, this.props.history);
      } else {
        console.log("There is only admin allow");
      }
    } else {
      alert("Please all values");
    }
  };

  componentDidMount() {
    let isLogin = localStorage.getItem("Login");
    if (isLogin) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="content">
        <div
          style={{ width: " 100%", display: "flex", justifyContent: "center" }}
        >
          <form style={{ width: "40%" }}>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={e => this.handleChange("email", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={e => this.handleChange("password", e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => this.onLogin()}
              link
              to={"/addProducts"}
            >
              Submit
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (obj, history) => dispatch(Login(obj, history))
});

export default connect(null, mapDispatchToProps)(Login1);
