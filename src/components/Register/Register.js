import React from "react";
import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerEmail: "",
      registerPassword: "",
      registerName: ""
    };
  }

  onEmailChange = e => {
    this.setState({ registerEmail: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ registerPassword: e.target.value });
  };
  onNameChange = e => {
    this.setState({ registerName: e.target.value });
  };

  onSubmitRegister = () => {
    // console.log(this.state);

    fetch("https://peaceful-brushlands-49140.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.registerEmail,
        password: this.state.registerPassword,
        name: this.state.registerName
      })
    })
      .then(response => console.log(response.json()))
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    return (
      <section id="register">
        <h2>Registration</h2>
        <form action="#" className="shadow-5">
          <div className="form-container ">
            <div className="field">
              <label>First Name</label>
              <input type="text" placeholder="Your First Name" />
            </div>
            <div className="field">
              <label>User Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={this.onNameChange}
                placeholder="Your userName"
              />
            </div>
            <div className="field w-100">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email-address"
                onChange={this.onEmailChange}
                placeholder="Email"
              />
            </div>
            <div className="field w-100">
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordChange}
                placeholder="Password"
              />
            </div>
            <div className="field w-100">
              <label> Confirm </label>
              <input type="password" placeholder="Confrim Password" />
            </div>
          </div>
          {/* <!-- form-container --> */}

          <div className="submit-form">
            <input
              onClick={this.onSubmitRegister}
              type="submit"
              value="Register"
              className="button grow"
            />
          </div>
        </form>
      </section>
    );
  }
}

export default Register;
