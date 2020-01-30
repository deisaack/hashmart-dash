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
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Services } from "../../Services";
import { Functions } from "../../Functions";
import Widget from "../../components/Widget";
import cx from "classnames";
import s from "../dashboard/Dashboard.module.scss";
import { Link } from "react-router-dom";

class ProductCategoryView extends Component {
  constructor(props) {
    super(props);
    this.services = new Services(this);
    this.funcs = new Functions(this, "imageUrl", "categoryDescription");
    this.state = {
      business: {},
      productCategory: {},
      categoryList: [],
      form: ""
      // productCategoryDescription: ""
    };
  }

  componentDidMount() {
    let code = this.getCode();
    this.services.getProductItem(code);
  }

  getCode = function() {
    const {
      match: { params }
    } = this.props;
    this.setState({ code: params.id });
    return params.id;
  };

  categoryForm = () => {
    this.setState({ form: "category" });
  };

  imageUploadForm = () => {
    console.log("IMAGE IIIPPLOOAD");
    this.setState({ form: "imageUpload" });
  };

  submitForm = () => {
    let data = {
      categoryDescription: this.state.categoryDescription,
      // "imageUrl": this.state.imageUrl,
      productCategoryCode: this.state.code
    };
    this.services.createCategory(data);
  };

  handleFileUpload = event => {
    event.preventDefault();
    let data = this.services.handleFileUpload(
      "productCategoryImageForm",
      "productCategoryImage"
    );

    this.services.__completeSubmission(
      `/api/v1/hashmart/upload-category-image?productcategorycode=${this.state.productCategory.productCategoryCode}&categorycode=${this.state.productCategory.category[0].categoryCode}`,
      data
    );
  };

  toggle = () => {
    this.setState({ form: "" });
  };

  render() {
    return (
      <div className={s.root}>
        {this.state.alert}

        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem>Product Categories</BreadcrumbItem>
          <BreadcrumbItem active>
            {this.state.productCategory.productCategoryCode}
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className="page-title mb-lg">
          <span className="fw-semi-bold">
            {this.state.productCategory.productCategoryDescription}
          </span>
        </h1>
        <Widget>
          <Row>
            <Col sm={2}></Col>
            <Col sm={2}>
              <Button
                className="pull-right btn btn-success btn-sm"
                onClick={this.imageUploadForm}
              >
                <i className="fa fa-cloud-upload" /> Upload Image
              </Button>
            </Col>
          </Row>
        </Widget>
        {this.state.form === "category" ? (
          <Widget title={<h5>Create Category</h5>} settings close>
            <Form>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="categoryDescription">Description</Label>
                    <Input
                      onFocus={this.funcs.handleFocus}
                      onBlur={this.funcs.handleBlur}
                      onChange={this.funcs.handleChange}
                      type="text"
                      name="categoryDescription"
                      id="categoryDescription"
                      placeholder=""
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="imageUrl">Image URL</Label>
                    <Input
                      onFocus={this.funcs.handleFocus}
                      onBlur={this.funcs.handleBlur}
                      onChange={this.funcs.handleChange}
                      // value={this.state.legalOrTradingName}
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
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

        {this.state.form === "imageUpload" ? (
          <Widget title={<h5>Create Category</h5>} settings close>
            <Row form>
              {/* <Col md={4}>
                  <FormGroup>
                    <Label for="categoryDescription">Description</Label>
                    <Input
                      onFocus={this.funcs.handleFocus}
                      onBlur={this.funcs.handleBlur}
                      onChange={this.funcs.handleChange}
                      type="text"
                      name="categoryDescription"
                      id="categoryDescription"
                      placeholder=""
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="imageUrl">Image URL</Label>
                    <Input
                      onFocus={this.funcs.handleFocus}
                      onBlur={this.funcs.handleBlur}
                      onChange={this.funcs.handleChange}
                      // value={this.state.legalOrTradingName}
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      placeholder=""
                    />
                  </FormGroup>
                </Col> */}
              {/* <Col md={4}>
                  <FormGroup>
                    <Label for="productCategoryImage">Image</Label>
                    <Input
                        onFocus={this.funcs.handleFocus}
                        onBlur={this.funcs.handleBlur}
                        onChange={this.funcs.handleChange}
                      value={this.state.legalOrTradingName}
                      type="file"
                      name="productCategoryImage"
                      id="productCategoryImage"
                      placeholder=""
                    />
                  </FormGroup>
                </Col> */}
              <Modal isOpen={true} toggle={this.toggle}>
                <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }}>
                  Upload Category Image
                </ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={this.handleFileUpload}
                    id="productCategoryImageForm"
                  >
                    <FormGroup>
                      <Row>
                        <Col md={2}>
                          <Label
                            for="productCategoryImage"
                            className="text-right"
                          >
                            Image
                          </Label>
                        </Col>
                        <Col md={8}>
                          <Input
                            onFocus={this.funcs.handleFocus}
                            onBlur={this.funcs.handleBlur}
                            onChange={this.funcs.handleChange}
                            value={this.state.legalOrTradingName}
                            type="file"
                            name="productCategoryImage"
                            id="productCategoryImage"
                            placeholder=""
                            // md={8}
                          />
                        </Col>{" "}
                      </Row>
                    </FormGroup>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="warning" onClick={this.toggle}>
                    Cancel
                  </Button>{" "}
                  <Button
                    color="secondary"
                    onClick={this.handleFileUpload}
                    type="submit"
                  >
                    Upload
                  </Button>
                </ModalFooter>
              </Modal>
            </Row>
            {/* <Row form>
                <Col md={8} className="" />
                <Col md={4} className="pull-right">
                  <Button
                    className="pull-right btn-info"
                    type="submit"
                    // onClick={this.funcs.handleClickSubmit}
                  >
                    Upload
                  </Button>
                </Col>
              </Row> */}
          </Widget>
        ) : (
          ""
        )}

        <Row>
          <Col sm={12} md={6}>
            <Widget
              title={
                <div>
                  <Col sm={9}>
                    <h5>Product Category Detail</h5>
                  </Col>
                  <Col sm={3}>
                    {/*<Button className=" btn btn-indigo btn-sm" onClick={this.showMyBusinesses}>*/}
                    {/*    <i className="fa fa-institution" /> My Businesses*/}
                    {/*</Button>*/}
                  </Col>
                </div>
              }
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
                    <td>Category Code</td>
                    <td>{this.state.productCategory.productCategoryCode}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>
                      {this.state.productCategory.productCategoryDescription}
                    </td>
                  </tr>
                  <tr>
                    <td>Date Created</td>
                    <td>{this.state.productCategory.dateCreated}</td>
                  </tr>
                  <tr>
                    <td>Created By</td>
                    <td>{this.state.productCategory.createdByName}</td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
          </Col>
          <Col sm={12} md={6}>
            <Widget
              title={
                <Row style={{ marginBottom: "5px" }}>
                  <Col sm={8}>
                    <h5>Categories</h5>
                  </Col>
                  <Col sm={4}>
                    {localStorage.getItem("role") === "Admin" ? (
                      <Button
                        className="pull-right btn btn-success btn-sm"
                        onClick={this.categoryForm}
                      >
                        <i className="fa fa-plus" /> Add
                      </Button>
                    ) : (
                      ""
                    )}
                    {/* <Button className="pull-right btn btn-success btn-sm" onClick={this.categoryForm}>
                                                <i className="fa fa-plus" /> Add
                                            </Button> */}
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
                    <th>Description</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.categoryList.map((item, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item.categoryCode}</td>
                      <td>{item.categoryDescription}</td>
                      <td>
                        <Link
                          to={`/app/category/${this.state.code}/${item.categoryCode}`}
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

export default ProductCategoryView;
