import React, { Component } from "react";
import {
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Services } from "../../Services";
import { Functions } from "../../Functions";
import Widget from "../../components/Widget";
import cx from "classnames";
import s from "../dashboard/Dashboard.module.scss";
import { Link } from "react-router-dom";
import Card from "reactstrap/es/Card";
import CardImg from "reactstrap/es/CardImg";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import CardText from "reactstrap/es/CardText";

class Brand extends Component {
  constructor(props) {
    super(props);
    this.services = new Services(this);
    this.funcs = new Functions(this);
    this.state = {
      business: {},
      category: {},
      form: "",
      subCategoryList: [],
      subCategories: [],
      brandsList: [],
      subCategory: {},
      brand: {}
    };
  }

  componentDidMount() {
    this.services.getProductItem(
      this.getProductCategory(),
      this.getCategory(),
      this.getSubCategory(),
      this.getBrand()
    );
  }

  getProductCategory = function() {
    const {
      match: { params }
    } = this.props;
    this.setState({ productCategoryCode: params.productCategoryCode });
    return params.productCategoryCode;
  };

  getBrand = function() {
    const {
      match: { params }
    } = this.props;
    this.setState({ brandCode: params.brandCode });
    return params.brandCode;
  };

  getCategory = function() {
    const {
      match: { params }
    } = this.props;
    this.setState({ categoryCode: params.categoryCode });
    return params.categoryCode;
  };

  getSubCategory = function() {
    const {
      match: { params }
    } = this.props;
    this.setState({ subCategoryCode: params.subCategoryCode });
    return params.subCategoryCode;
  };

  productForm = () => {
    this.setState({ form: "productForm" });
  };

  submitForm = () => {
    let data = {
      companyCode: this.state.companyCode,
      subCategoryCode: this.state.subCategoryCode,
      brandCode: this.state.brandCode,
      productName: this.state.productName,
      productCode: this.state.productCode,
      description: this.state.description,
      availableQuantity: this.funcs.twoDp(this.state.availableQuantity),
      price: this.funcs.twoDp(this.state.price),
      discount: this.funcs.twoDp(this.state.discount),
      actuaLAmount: this.funcs.twoDp(this.state.actuaLAmount)
    };
    this.services.createProduct(data);
  };

  render() {
    return (
      <div className={s.root}>
        {this.state.alert}
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem>Product Categories</BreadcrumbItem>
          <BreadcrumbItem>Categories</BreadcrumbItem>
          <BreadcrumbItem>Sub categories</BreadcrumbItem>
          <BreadcrumbItem>Brand</BreadcrumbItem>
          <BreadcrumbItem active>{this.state.brand.brandCode}</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="page-title mb-lg">
          <span className="fw-semi-bold">{this.state.brand.brandName}</span>
        </h1>
        {this.state.form === "product" ? (
          <Widget title={<h5>Create A Product</h5>} settings close>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="companyCode">Company Code</Label>
                    <Input
                      onFocus={this.funcs.handleFocus}
                      onBlur={this.funcs.handleBlur}
                      onChange={this.funcs.handleChange}
                      type="text"
                      name="companyCode"
                      id="companyCode"
                      placeholder=""
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="productName">Product Name</Label>
                    <Input
                      onFocus={this.funcs.handleFocus}
                      onBlur={this.funcs.handleBlur}
                      onChange={this.funcs.handleChange}
                      type="text"
                      name="productName"
                      id="productName"
                      placeholder=""
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="actuaLAmount">Actual Amount</Label>
                    <Input
                      onFocus={this.funcs.handleFocus}
                      onBlur={this.funcs.handleBlur}
                      onChange={this.funcs.handleChange}
                      type="number"
                      name="actuaLAmount"
                      id="actuaLAmount"
                      placeholder=""
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="availableQuantity">Available Quantity</Label>
                    <Input
                      onFocus={this.funcs.handleFocus}
                      onBlur={this.funcs.handleBlur}
                      onChange={this.funcs.handleChange}
                      type="number"
                      name="availableQuantity"
                      id="availableQuantity"
                      placeholder=""
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="price">Price</Label>
                    <Input
                      onFocus={this.funcs.handleFocus}
                      onBlur={this.funcs.handleBlur}
                      onChange={this.funcs.handleChange}
                      type="number"
                      name="price"
                      id="price"
                      placeholder=""
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="discount">Discount</Label>
                    <Input
                      onFocus={this.funcs.handleFocus}
                      onBlur={this.funcs.handleBlur}
                      onChange={this.funcs.handleChange}
                      type="number"
                      name="discount"
                      id="discount"
                      placeholder=""
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      onFocus={this.funcs.handleFocus}
                      onBlur={this.funcs.handleBlur}
                      onChange={this.funcs.handleChange}
                      type="textarea"
                      name="description"
                      id="description"
                      placeholder=""
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={8} className="" />
                <Col md={4} className="pull-right">
                  <Button
                    className="pull-right btn-info"
                    onClick={this.funcs.handleClickSubmit}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Widget>
        ) : (
          ""
        )}

        <Row>
          <Col sm={12} md={12}>
            <Widget
              title={
                <Row style={{ marginBottom: "5px" }}>
                  <Col sm={8}>{/*<h5>Brands</h5>*/}</Col>
                  <Col sm={4}>
                    {localStorage.role === "Business" ? (
                      <Button
                        className="pull-right btn btn-success btn-sm"
                        onClick={() => this.funcs.showForm("product")}
                      >
                        <i className="fa fa-plus" /> Add
                      </Button>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
              }
              settings
              close
            >
              <Table responsive striped className={cx("mb-0", s.usersTable)}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Brand Code</td>
                    <td>{this.state.brand.brandCode}</td>
                  </tr>
                  <tr>
                    <td>Image</td>
                    <td>{this.state.brand.brandName}</td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Brand;
