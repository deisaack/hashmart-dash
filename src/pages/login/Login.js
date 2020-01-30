import React from "react";
import { Alert, Button, FormGroup, Input, Row, Col, Form } from "reactstrap";
import s from "./Login.module.scss";
import Widget from "../../components/Widget";
import Footer from "../../components/Footer";
import { Services } from "../../Services";
import axios from "axios";
import { Link } from "react-router-dom";
import { Functions } from "../../Functions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "superadmin@hashmart.co.ke",
      password: "Testing#2019",
      errors: [],
      display: "form",
      businessList: []
    };
    this.services = new Services(this);
    this.funcs = new Functions(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLoggedIn = resp => {
    this.setState({ changePassword: resp.data.updatePassword });
    let role = resp.data.roles.result[0];
    localStorage.setItem("authToken", resp.data.token);
    localStorage.setItem("role", role);
    localStorage.setItem("initialTime", Date.now());
    if (role === "Business") {
      this.services.getMyBusinesses(resp.data.token);
    } else if (role === "Admin") {
      window.location.href = "/#/app/main";
    }
    window.Env.refreshTokenInterval();
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
          this.handleLoggedIn(response);
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

  selectBusiness = () => {
    console.log("selectingBusiness");
  };

  render() {
    return (
      <div className={s.root}>
        {this.state.display === "form" ? (
          <Row>
            <Col
              xs={{ size: 10, offset: 1 }}
              sm={{ size: 6, offset: 3 }}
              lg={{ size: 4, offset: 4 }}
            >
              <p className="text-center">Hashmart Dashboard</p>
              <Widget className={s.widget}>
                <h4 className="mt-0">Login to your Web App</h4>
                <br />
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
        ) : (
          <Row>
            <Col
              xs={{ size: 10, offset: 1 }}
              sm={{ size: 6, offset: 3 }}
              lg={{ size: 4, offset: 4 }}
            >
              <p className="text-center">Select A business</p>
              {this.state.businessList.map((business, key) => (
                <Widget key={key}>
                  <img
                    style={{ height: "40px" }}
                    src="https://hashmart.co.ke/media/catalog/product/cache/ecd051e9670bd57df35c8f0b122d8aea/c/e/cet968_3_672x672-min.jpg"
                    alt=""
                  />
                  <b style={{ fontWeight: "bolt", fontSize: "1.5em" }}>
                    Code for Entrepreneurs
                  </b>
                </Widget>
              ))}

              {/* <Widget
                style={{ cursor: "pointer" }}
                onClick={this.funcs.logoutUser}
              >
                <img
                  style={{ height: "40px" }}
                  src="https://hashmart.co.ke/media/catalog/product/cache/ecd051e9670bd57df35c8f0b122d8aea/c/e/cet968_3_672x672-min.jpg"
                  alt=""
                />
                <b
                  style={{ fontWeight: "bolt", fontSize: "1.5em" }}
                  onClick={this.funcs.logoutUser}
                >
                  Code for Entrepreneurs
                </b>
                <i
                  className="fa fa-arrow-right pull-right fa-2x"
                  onClick={this.funcs.logoutUser}
                />
              </Widget> */}
              <p className="text-center">
                <a onClick={this.funcs.logoutUser}>Use another Account</a>
              </p>
            </Col>
          </Row>
        )}
        <Footer className="text-center" />
      </div>
    );
  }
}

export default Login;
