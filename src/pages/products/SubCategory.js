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

class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.services = new Services(this);
    this.funcs = new Functions(this, "brandName");
    this.state = {
      business: {},
      category: {},
      form: "",
      subCategoryList: [],
      subCategories: [],
      brandsList: [],
      subCategory: {}
    };
  }

  componentDidMount() {
    this.services.getProductItem(
      this.getProductCategory(),
      this.getCategory(),
      this.getSubCategory()
    );
  }

  getProductCategory = function() {
    const {
      match: { params }
    } = this.props;
    this.setState({ productCategoryCode: params.productCategoryCode });
    return params.productCategoryCode;
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

  submitForm = () => {
    let data = {
      productcode: this.state.productCategoryCode,
      categorycode: this.state.categoryCode,
      subcategorycode: this.state.subCategoryCode,
      brandName: this.state.brandName
    };
    this.services.createBrand(data);
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
          <BreadcrumbItem active>
            {this.state.subCategory.subCategoryCode}
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className="page-title mb-lg">
          <span className="fw-semi-bold">
            {this.state.subCategory.subCategoryDescription}
          </span>
        </h1>
        {this.state.form === "brand" ? (
          <Widget title={<h5>Create A Brand</h5>} settings close>
            <Form>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="brandName">Brand Name</Label>
                    <Input
                      onFocus={this.funcs.handleFocus}
                      onBlur={this.funcs.handleBlur}
                      onChange={this.funcs.handleChange}
                      type="text"
                      name="brandName"
                      id="brandName"
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
          <Col sm={12} md={6}>
            <div>
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={this.state.subCategory.imageUrl}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle>
                    {this.state.subCategory.subCategoryCode}
                  </CardTitle>
                  <CardSubtitle>Sub Category Detail</CardSubtitle>
                  <CardText>
                    {this.state.subCategory.subCategoryDescription}.
                  </CardText>
                  {/*<Button>Button</Button>*/}
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <Widget
              title={
                <Row style={{ marginBottom: "5px" }}>
                  <Col sm={8}>
                    <h5>Brands</h5>
                  </Col>
                  <Col sm={4}>
                    {localStorage.role === "Admin" ? (
                      <Button
                        className="pull-right btn btn-success btn-sm"
                        onClick={() => this.funcs.showForm("brand")}
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
              <Table borderless className={s.mainTable}>
                <thead>
                  <tr>
                    <th className="hidden-sm-down">#</th>
                    <th>Code</th>
                    <th>Brand Name</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.brandsList.map((item, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item.brandCode}</td>
                      <td>{item.brandName}</td>
                      <td>
                        <Link
                          to={`/app/brand/${this.state.productCategory.productCategoryCode}/${this.state.category.categoryCode}/${this.state.subCategory.subCategoryCode}/${item.brandCode}`}
                        >
                          <i className="fa fa-eye" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SubCategory;
