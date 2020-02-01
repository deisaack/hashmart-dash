import React, { useState, Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Table,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import classnames from "classnames";
import { Services } from "../../Services";
import { Functions } from "../../Functions";
import Widget from "../../components/Widget";
import s from "../../styles/Static.module.scss";

class Carded extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: [],
      alert: "",
      product: {},
      features: [],
      productFiles: [],
      form: "",
      changesInProductStock: [],
      activeTab: "1"
    };
    this.services = new Services(this);
    this.funcs = new Functions(this);
  }

  toggle = tab => {
    this.setState({
      activeTab: tab
    });
  };

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

  toggleForm = () => {
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
      <div className="container-fluid">
        <Row>
          <Card body>
            <CardTitle
              cssModule={{
                "card-title": "w-100 text-center"
              }}
            >
              Product
            </CardTitle>
            <CardText>
              <Widget settings close>
                <Table
                  className="table-responsive"
                  bordered={true}
                  className={s.mainTable}
                >
                  <tbody>
                    {" "}
                    <tr>
                      <td>Product Name</td>
                      <td>{this.state.product.productName}</td>
                    </tr>
                    <tr>
                      <td>Product Code</td>
                      <td>{this.state.product.productCode}</td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>{this.state.product.description}</td>
                    </tr>
                    <tr>
                      <td>Available_Quantity</td>
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
            </CardText>
          </Card>
        </Row>
        <br />
        <Row>
          <Card body>
            <CardTitle
              cssModule={{
                "card-title": "w-100 text-center"
              }}
            >
              Product Features
            </CardTitle>
            <CardText>
              <Widget
                title={
                  <Row style={{ marginBottom: "5px" }}>
                    <Col md={12}>
                      {/* <h5>Product Features</h5>
                            </Col>
                            <Col sm={4}> */}
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
                      {" "}
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
            </CardText>
          </Card>
        </Row>
        <br />
        <Row>
          <Col sm="12">
            <Card body>
              <CardTitle
                cssModule={{
                  "card-title": "w-100 text-center"
                }}
              >
                Changes in Product Stock
              </CardTitle>
              <CardText>
                <Widget settings close>
                  <Table borderless className={s.mainTable}>
                    <thead>
                      <tr>
                        <th className="hidden-sm-down">#</th>
                        <th>Quantity Received</th>
                        <th>Quantity Disbursed</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Discount Allowed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.changesInProductStock.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.quantityReceived}</td>
                          <td>{item.quantityDisbursed}</td>
                          <td>{item.debit}</td>
                          <td>{item.credit}</td>
                          <td>{item.totalDiscountAllowed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Widget>
              </CardText>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm="12">
            <Card body>
              <CardTitle
                cssModule={{
                  "card-title": "w-100 text-center"
                }}
              >
                Increase Product Stock
              </CardTitle>
              <CardText>
                <Form>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="buyingPrice" className="text-right">
                          Buying Price
                        </Label>

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
                        {" "}
                        <Label for="discountAllowed">
                          Discount Allowed
                        </Label>{" "}
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
              </CardText>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Carded;
