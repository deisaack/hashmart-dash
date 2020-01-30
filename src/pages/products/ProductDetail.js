import React, { Component } from 'react';
import {
    Row,
    Col,
    Table,
    Breadcrumb,
    BreadcrumbItem, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import Widget from '../../components/Widget';
import s from '../../styles/Static.module.scss';
import {Link} from "react-router-dom";
import {Services} from "../../Services";
import {Functions} from "../../Functions";


class ProductDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productList: [],
            alert: "",
            product: {},
            features: [],
            productFiles: [],
            form: ""
        };
        this.services = new Services(this);
        this.funcs = new Functions(this,)
    }

    componentDidMount() {
        this.services.getSingleProduct(this.getProductCode());
    }

    getProductCode = function() {
        const { match: { params } } = this.props;
        this.setState({productCode: params.productCode});
        return params.productCode
    };

    submitForm = () => {
        if (this.state.form === "features") {
                let data = [
                    {
                        "name": this.state.name,
                        "description": this.state.description,
                        "featureCode": this.state.featureCode
                    }
                ];
                this.services.addProductFeature(this.state.productCode, data)
        } else if (this.state.form === "productFiles") {
            let data = {
                "productcode": this.state.productCategoryCode,
                "categorycode": this.state.categoryCode,
                "subcategorycode": this.state.subCategoryCode,
                "brandName": this.state.brandName
            };
            this.services.createBrand(data)
        }

    };

    render() {
        return (
            <div>
                {this.state.alert}
                <Breadcrumb>
                    <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
                    <BreadcrumbItem>Products</BreadcrumbItem>
                    <BreadcrumbItem active>{this.state.productCode}</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="page-title mb-lg"><span className="fw-semi-bold">Products</span></h1>
                <Row>
                    <Col sm={12}>
                        <Widget
                             settings close
                        >
                            <Table bordered={true} className={s.mainTable}>
                                <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th className="hidden-sm-down">Description</th>
                                    <th className="hidden-sm-down">Available Quantity</th>
                                    <th className="hidden-sm-down">Price</th>
                                    <th className="hidden-sm-down">Discount</th>
                                    <th className="hidden-sm-down">Actual Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.state.product.productCode}</td>
                                        <td>{this.state.product.productName}</td>
                                        <td>{this.state.product.description}</td>
                                        <td>{this.state.product.availableQuantity}</td>
                                        <td>Ksh {this.state.product.price}</td>
                                        <td>{this.state.product.discount}</td>
                                        <td>{this.state.product.actuaLAmount}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Widget>
                        <br/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <Widget
                            title={
                                <Row style={{marginBottom: "5px"}}>
                                    <Col sm={8}>
                                        <h5>Product Files</h5>
                                    </Col>
                                    <Col sm={4}>
                                        <Button className="pull-right btn btn-success btn-sm" onClick={()=>this.funcs.showForm("productFiles")}>
                                            <i className="fa fa-plus" /> Add
                                        </Button>
                                    </Col>
                                </Row>
                            } settings close
                        >
                            {this.state.form === "productFiles" ? (

                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="categoryDescription">Description</Label>
                                                    <Input
                                                        onFocus={this.funcs.handleFocus}
                                                        onBlur={this.funcs.handleBlur}
                                                        onChange={this.funcs.handleChange}
                                                        type="text" name="categoryDescription" id="categoryDescription"
                                                        placeholder="" />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="imageUrl">Image URL</Label>
                                                    <Input
                                                        onFocus={this.funcs.handleFocus}
                                                        onBlur={this.funcs.handleBlur}
                                                        onChange={this.funcs.handleChange}
                                                        // value={this.state.legalOrTradingName}
                                                        type="text" name="imageUrl" id="imageUrl"
                                                        placeholder="" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={8} className="" />
                                            <Col md={4} className="pull-right">
                                                <Button className="pull-right btn-info btn-sm" onClick={this.funcs.handleClickSubmit}>Submit</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                            ): ""}
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
                                {
                                    this.state.productFiles.map((item, key) =>
                                        <tr key={key}>
                                            <td>{key+1}</td>
                                            <td>{item.subCategoryCode}</td>
                                            <td>{item.subCategoryDescription}</td>
                                            <td>{item.imageUrl}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        </Widget>
                    </Col>
                    <Col sm={12} md={6}>
                        <Widget
                            title={
                                <Row style={{marginBottom: "5px"}}>
                                    <Col sm={8}>
                                        <h5>Product Features</h5>
                                    </Col>
                                    <Col sm={4}>
                                        <Button className="pull-right btn btn-success btn-sm" onClick={()=>this.funcs.showForm("features")}>
                                            <i className="fa fa-plus" /> Add
                                        </Button>
                                    </Col>
                                </Row>
                            } settings close
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
                                                    type="text" name="name" id="name"
                                                    placeholder="" />
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
                                                    type="text" name="description" id="description"
                                                    placeholder="" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={12}>
                                            <Button className="pull-right btn-info btn-sm" onClick={this.funcs.handleClickSubmit}>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            ): ""}
                            <Table borderless className={s.mainTable}>
                                <thead>
                                <tr>
                                    <th className="hidden-sm-down">#</th>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th className="hidden-sm-down">Name</th>
                                    <th />
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.features.map((item, key) =>
                                        <tr key={key}>
                                            <td>{key+1}</td>
                                            <td>{item.featureCode}</td>
                                            <td>{item.description}</td>
                                            <td>{item.name}</td>
                                        </tr>
                                    )
                                }
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