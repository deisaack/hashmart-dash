import React from "react";
import { Alert, Button, FormGroup, Input, Row, Col, Form } from "reactstrap";
import s from "../login/Login.module.scss";
import Widget from "../../components/Widget/Widget";
// import Footer from "../../components/Footer";
import { Services } from "../../Services";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: []
    };
    this.services = new Services(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  register = event => {
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
            <Widget className={s.widget}>
              <h4 className="mt-0 text-centre">Register</h4>
              {/* <p className="fs-sm text-muted">
              </p> */}
              <Form className="mt" onSubmit={this.doLogin}>
                {this.props.errorMessage && (
                  <Alert size="sm" color="danger">
                    {this.props.errorMessage}
                  </Alert>
                )}
                <FormGroup className="form-group">
                  <Input
                    className="no-border"
                    value={this.state.name}
                    onChange={this.handleChange}
                    type="text"
                    required
                    name="name"
                    placeholder="Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    className="no-border"
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                    type="text"
                    required
                    name="phoneNumber"
                    placeholder="Phone Number"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    className="no-border"
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="email"
                    required
                    name="email"
                    placeholder="Email address"
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
                <FormGroup>
                  <Input
                    className="no-border"
                    value={this.state.confirm_password}
                    onChange={this.handleChange}
                    type="password"
                    required
                    name="confirm_password"
                    placeholder="Confirm password"
                  />
                </FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  {/* eslint-disable-line */}
                  <div>
                    <Button color="success" size="sm" type="submit">
                      {this.state.isLoading
                        ? "Loading..."
                        : "Create an account"}
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

export default Register;
