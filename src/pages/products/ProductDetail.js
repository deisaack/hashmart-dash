import React, { Component } from "react";
import {
  Row,
  Col,
  Table,
  Breadcrumb,
  BreadcrumbItem,
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

import Widget from "../../components/Widget";
import s from "../../styles/Static.module.scss";
import { Services } from "../../Services";
import { Functions } from "../../Functions";
import Card from "reactstrap/es/Card";
import CardImg from "reactstrap/es/CardImg";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import CardText from "reactstrap/es/CardText";

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: [],
      alert: "",
      product: {},
      features: [],
      productFiles: [],
      form: "",
      changesInProductStock: []
    };
    this.services = new Services(this);
    this.funcs = new Functions(this);
  }

  componentDidMount() {
    this.services.getSingleProduct(this.getProductCode());
    this.services.getProductChangeInStock(this.getProductCode());
  }

  getProductCode = function() {
    const {
      match: { params }
    } = this.props;
    this.setState({ productCode: params.productCode });
    return params.productCode;
  };

  submitForm = () => {
    if (this.state.form === "features") {
      let data = [
        {
          name: this.state.name,
          description: this.state.description,
          featureCode: this.state.featureCode
        }
      ];
      this.services.addProductFeature(this.state.productCode, data);
    } else if (this.state.form === "stock") {
      let data = {
        productcode: this.state.productCode,
        sellingPrice: parseFloat(this.state.sellingPrice),
        buyingPrice: parseFloat(this.state.buyingPrice),
        discount: parseFloat(this.state.discountAllowed),
        quantity: parseFloat(this.state.quantity)
      };
      this.services.increaseProductStock(data);
    }
  };

  toggle = () => {
    this.setState({ form: "" });
  };

  handleFileUpload = event => {
    event.preventDefault();
    let data = this.services.handleFileUpload(
      "productImageForm",
      "productImage"
    );

    this.services.__completeSubmission(
      `/api/v1/hashmart/upload-product-image?productcode=${this.state.productCode}`,
      data
    );
  };

  render() {
    return (
      <div>
        {this.state.alert}
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem>Product</BreadcrumbItem>
          <BreadcrumbItem active>{this.state.productCode}</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="page-title mb-lg">
          <span className="fw-semi-bold">Product</span>
        </h1>
        <Row>
          <Col sm={12}>
            <Widget settings close>
              <Table
                className="table-responsive"
                bordered={true}
                className={s.mainTable}
              >
                <thead></thead>
                <tbody>
                  <tr>
                    <td>Product Code</td>
                    <td>{this.state.product.productCode}</td>
                  </tr>
                  <tr>
                    <td>product Name</td>
                    <td>{this.state.product.productName}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{this.state.product.description}</td>
                  </tr>
                  <tr>
                    <td>Available Quantity</td>
                    <td>{this.state.product.availableQuantity}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>Ksh {this.state.product.price}</td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>{this.state.product.discount}</td>
                  </tr>
                  <tr>
                    <td>Actual Amount</td>
                    <td>{this.state.product.actuaLAmount}</td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
            <br />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Widget
              title={
                <Row style={{ marginBottom: "5px" }}>
                  <Col sm={8}>
                    <h5>Product Features</h5>
                  </Col>
                  <Col sm={4}>
                    <Button
                      className="pull-right btn btn-success btn-sm"
                      onClick={() => this.funcs.showForm("features")}
                    >
                      <i className="fa fa-plus" /> Add
                    </Button>
                  </Col>
                </Row>
              }
              settings
              close
            >
              {this.state.form === "features" ? (
                <Form>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                          onFocus={this.funcs.handleFocus}
                          onBlur={this.funcs.handleBlur}
                          onChange={this.funcs.handleChange}
                          type="text"
                          name="name"
                          id="name"
                          placeholder=""
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                          onFocus={this.funcs.handleFocus}
                          onBlur={this.funcs.handleBlur}
                          onChange={this.funcs.handleChange}
                          // value={this.state.legalOrTradingName}
                          type="text"
                          name="description"
                          id="description"
                          placeholder=""
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={12}>
                      <Button
                        className="pull-right btn-info btn-sm"
                        onClick={() =>
                          this.funcs.handleClickSubmit("description", "name")
                        }
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              ) : (
                ""
              )}
              <Table borderless className={s.mainTable}>
                <thead>
                  <tr>
                    <th className="hidden-sm-down">#</th>
                    {/*<th>Code</th>*/}
                    <th>Description</th>
                    <th className="hidden-sm-down">Name</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.features.map((item, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      {/*<td>{item.featureCode}</td>*/}
                      <td>{item.description}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Widget>
          </Col>

          <Col sm={12} md={6}>
            <Widget
              title={
                <Row style={{ marginBottom: "5px" }}>
                  <Col sm={8}>
                    <h5>Product Files</h5>
                  </Col>
                  <Col sm={4}>
                    {/* <Button
                      className="pull-right btn btn-success btn-sm"
                      onClick={() => this.funcs.showForm("productFiles")}
                    >
                      <i className="fa fa-plus" /> Add
                    </Button> */}
                    {/* <Col sm={2}> */}
                    <Button
                      className="pull-right btn btn-success btn-sm"
                      onClick={() => this.funcs.showForm("productFiles")}
                    >
                      <i className="fa fa-cloud-upload" /> Upload image
                    </Button>
                    {/* </Col> */}
                  </Col>
                </Row>
              }
              settings
              close
            >
              {this.state.form === "productFiles" ? (
                <Form>
                  <Row form>
                    <Modal isOpen={true} toggle={this.toggle}>
                      <ModalHeader
                        cssModule={{ "modal-title": "w-100 text-center" }}
                      >
                        Upload Product File
                      </ModalHeader>
                      <ModalBody>
                        <form
                          onSubmit={this.handleFileUpload}
                          id="productImageForm"
                        >
                          <FormGroup>
                            <Row>
                              <Col md={2}>
                                <Label
                                  for="productImage"
                                  className="text-right"
                                >
                                  File
                                </Label>
                              </Col>
                              <Col md={8}>
                                <Input
                                  onFocus={this.funcs.handleFocus}
                                  onBlur={this.funcs.handleBlur}
                                  onChange={this.funcs.handleChange}
                                  value={this.state.legalOrTradingName}
                                  type="file"
                                  name="productImage"
                                  id="productImage"
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
                        className="pull-right btn-info btn-sm"
                        onClick={() =>
                          this.funcs.handleClickSubmit(
                            "imageUrl",
                            "categoryDescription"
                          )
                        }
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row> */}
                </Form>
              ) : (
                ""
              )}
              <Table borderless className={s.mainTable}>
                <thead>
                  <tr>
                    <th className="hidden-sm-down">#</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th className="hidden-sm-down">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.productFiles.map((item, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item.subCategoryCode}</td>
                      <td>{item.subCategoryDescription}</td>
                      <td>{item.imageUrl}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Widget
              title={
                <Row style={{ marginBottom: "5px" }}>
                  <Col sm={8}>
                    <h5>Changes in stock</h5>
                  </Col>
                  <Col sm={4}>
                    <Button
                      className="pull-right btn btn-success btn-sm"
                      onClick={() => this.funcs.showForm("stock")}
                    >
                      <i className="fa fa-plus" /> Add
                    </Button>
                  </Col>
                </Row>
              }
              settings
              close
            >
              {this.state.form === "stock" ? (
                <Form>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="buyingPrice">Buying Price</Label>
                        <Input
                          onFocus={this.funcs.handleFocus}
                          onBlur={this.funcs.handleBlur}
                          onChange={this.funcs.handleChange}
                          type="text"
                          name="buyingPrice"
                          id="buyingPrice"
                          placeholder=""
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="sellingPrice">Selling Price</Label>
                        <Input
                          onFocus={this.funcs.handleFocus}
                          onBlur={this.funcs.handleBlur}
                          onChange={this.funcs.handleChange}
                          // value={this.state.legalOrTradingName}
                          type="text"
                          name="sellingPrice"
                          id="sellingPrice"
                          placeholder=""
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="discountAllowed">Discount Allowed</Label>
                        <Input
                          onFocus={this.funcs.handleFocus}
                          onBlur={this.funcs.handleBlur}
                          onChange={this.funcs.handleChange}
                          type="text"
                          name="discountAllowed"
                          id="discountAllowed"
                          placeholder=""
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="quantity">Quantity</Label>
                        <Input
                          onFocus={this.funcs.handleFocus}
                          onBlur={this.funcs.handleBlur}
                          onChange={this.funcs.handleChange}
                          // value={this.state.legalOrTradingName}
                          type="text"
                          name="quantity"
                          id="quantity"
                          placeholder=""
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={8} className="" />
                    <Col md={4} className="pull-right">
                      <Button
                        className="pull-right btn-info btn-sm"
                        onClick={() =>
                          this.funcs.handleClickSubmit(
                            "buyingPrice",
                            "sellingPrice",
                            "discountAllowed",
                            "quantity"
                          )
                        }
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              ) : (
                ""
              )}
              <Table borderless className={s.mainTable}>
                <thead>
                  <tr>
                    <th className="hidden-sm-down">#</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th className="hidden-sm-down">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.productFiles.map((item, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item.subCategoryCode}</td>
                      <td>{item.subCategoryDescription}</td>
                      <td>{item.imageUrl}</td>
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
export default ProductDetail;
