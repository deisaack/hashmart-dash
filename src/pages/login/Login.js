import React from "react";
import { Alert, Button, FormGroup, Input, Row, Col, Form } from "reactstrap";
import s from "./Login.module.scss";
import Widget from "../../components/Widget";
import Footer from "../../components/Footer";
import { Services } from "../../Services";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "superadmin@hashmart.co.ke",
      password: "Testing#2019",
      errors: []
    };
    this.services = new Services(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  doLogin = event => {
    event.preventDefault();

    this.setState({ isLoading: true, alert: null });
    const data = {
      email: this.state.email.trim(),
      password: this.state.password.trim()
    };

    axios
      .post(`${this.services.BASE_URL}/api/v1/hashmart/login`, data)
      .then(response => {
        if (response.status === 200) {
          this.setState({ changePassword: response.data.updatePassword });
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("initialTime", Date.now());
          window.location.href = "/#/app/main";
          window.Env.refreshTokenInterval();
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
        let errors = [...this.state.errors];

        if (error.response === undefined) {
          errors.push("Oops network error, kindly check your connection!");
        } else {
          if (error.response.status === 401) {
            if (error.response.data.isLockedOut === true) {
              errors.push(
                "Your Account has been blocked due to many invalid attempts! Kindly contact your administrator for assistance"
              );
            } else {
              errors.push("Incorrect Password!");
            }
          } else if (error.response.status === 403) {
            errors.push(
              "Your account has been deactivated! Kindly contact the administrator for assistance!"
            );
          } else if (error.response.status === 404) {
            errors.push(error.response.data);
          } else {
            errors.push(error.response.data.message);
          }
        }
        this.setState({ errors });
      });
  };

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col
            xs={{ size: 10, offset: 1 }}
            sm={{ size: 6, offset: 3 }}
            lg={{ size: 4, offset: 4 }}
          >
            <p className="text-center">React Dashboard</p>
            <Widget className={s.widget}>
              <h4 className="mt-0">Login to your Web App</h4>
              <p className="fs-sm text-muted">
                User your username and password to sign in
                <br />
                Don&#39;t have an account? Sign up now!
              </p>
              <Form className="mt" onSubmit={this.doLogin}>
                {this.props.errorMessage && (
                  <Alert size="sm" color="danger">
                    {this.props.errorMessage}
                  </Alert>
                )}
                <FormGroup className="form-group">
                  <Input
                    className="no-border"
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="text"
                    required
                    name="email"
                    placeholder="email"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    className="no-border"
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                  />
                </FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <a href="#" className="fs-sm">
                    Trouble with account?
                  </a>{" "}
                  {/* eslint-disable-line */}
                  <div>
                    <Link to={`/register`}>
                      <Button color="default" size="sm">
                        Create an account
                      </Button>
                    </Link>
                    <Button color="success" size="sm" type="submit">
                      {this.state.isLoading ? "Loading..." : "Login"}
                    </Button>
                  </div>
                </div>
              </Form>
            </Widget>
          </Col>
        </Row>
        <Footer className="text-center" />
      </div>
    );
  }
}

export default Login;
