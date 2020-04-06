import React from "react";
import "./SignIn.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: ""
    };
  }

  onEmailChange = e => {
    this.setState({ signInEmail: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ signInPassword: e.target.value });
  };

  onSubmitSignIn = () => {
    console.log(this.state);
    fetch("https://peaceful-brushlands-49140.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;

    return (
      <section id="signIn">
        <h2>Sign In</h2>
        <form action="#" className="shadow-5">
          <div className="form-container ">
            <div className="field">
              <label>First Name</label>
              <input type="text" placeholder="Your First Name" />
            </div>
            <div className="field">
              <label>Last name</label>
              <input type="text" placeholder="Your Last Name" />
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
          
          </div>
          {/* <!-- form-container --> */}

          <div className="submit-form">
            <input
              onClick={this.onSubmitSignIn}
              type="submit"
              value="Sign In"
              className="button grow"
            />
          </div>
          <div>
            <p
              onClick={() => onRouteChange("register")}
              className="f3 form--p link dim white underline pa3 pointer"
            >
              
              Register
            </p>
          </div>
        </form>
      </section>
    );
  }
}

export default SignIn;
