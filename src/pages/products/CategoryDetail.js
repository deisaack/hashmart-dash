import React, { Component } from 'react';
import {
    Row,
    Breadcrumb,
    BreadcrumbItem, Col, Table, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import {Services} from "../../Services";
import {Functions} from "../../Functions";
import Widget from "../../components/Widget";
import cx from "classnames";
import s from "../dashboard/Dashboard.module.scss";
import {Link} from "react-router-dom";

class CategoryDetail extends Component {

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
            productCategory: {}
        }
    }

    componentDidMount() {
        this.services.getProductItem(this.getProductCategory(), this.getCode())
    }

    getCode = function() {
        const { match: { params } } = this.props;
        this.setState({code: params.id});
        return params.id
    };

    getProductCategory = function() {
        const { match: { params } } = this.props;
        this.setState({productCategory: params.productCategory});
        return params.productCategory
    };

    subCategoryForm = () => {
        this.setState({form: "subCategory"})
    };

    submitForm = () => {
        let data = {
            "categoryCode": this.state.code,
            "categoryDescription": this.state.categoryDescription,
            "imageUrl": this.state.imageUrl,
            "productCategoryCode": this.state.productCategory.productCategoryCode
        };
        this.services.createSubCategory(data)
    };




    render() {
        return (
            <div className={s.root}>
                {this.state.alert}
                <Breadcrumb>
                    <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
                    <BreadcrumbItem>Product Categories</BreadcrumbItem>
                    <BreadcrumbItem>Categories</BreadcrumbItem>
                    <BreadcrumbItem active>{this.state.category.categoryCode}</BreadcrumbItem>
                </Breadcrumb>
            <h1 className="page-title mb-lg"><span className="fw-semi-bold">{this.state.category.categoryDescription}</span></h1>
                {this.state.form === "subCategory" ? (
                    <Widget
                        title={<h5>
                            Create Category
                        </h5>} settings close
                    >
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
                                    <Button className="pull-right btn-info" onClick={this.funcs.handleClickSubmit}>Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Widget>
                ): ""}

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
                            <Table responsive striped className={cx('mb-0', s.usersTable)}>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Category Code</td>
                                    <td>{this.state.category.categoryCode}</td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>{this.state.category.categoryDescription}</td>
                                </tr>
                                <tr>
                                    <td>Image</td>
                                    <td>{this.state.category.imageUrl}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Widget>
                    </Col>
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
                            <Table responsive striped className={cx('mb-0', s.usersTable)}>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Category Code</td>
                                    <td>{this.state.category.categoryCode}</td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>{this.state.category.categoryDescription}</td>
                                </tr>
                                <tr>
                                    <td>Image</td>
                                    <td>{this.state.category.imageUrl}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Widget>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={12}>
                        <Widget
                            title={
                                <Row style={{marginBottom: "5px"}}>
                                    <Col sm={8}>
                                        <h5>Sub Categories</h5>
                                    </Col>
                                    <Col sm={4}>
                                        <Button className="pull-right btn btn-success btn-sm" onClick={this.subCategoryForm}>
                                            <i className="fa fa-plus" /> Add
                                        </Button>
                                    </Col>
                                </Row>
                            } settings close
                        >
                            <Table borderless className={s.mainTable}>
                                <thead>
                                <tr>
                                    <th className="hidden-sm-down">#</th>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th className="hidden-sm-down">Image</th>
                                    <th />
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.subCategories.map((item, key) =>
                                        <tr key={key}>
                                            <td>{key+1}</td>
                                            <td>{item.subCategoryCode}</td>
                                            <td>{item.subCategoryDescription}</td>
                                            <td><img src={item.imageUrl} alt="" style={{height: "50px", width: "50px"}}/></td>
                                            <td><Link to={`/app/sub-category/${this.state.productCategory.productCategoryCode}/${this.state.category.categoryCode}/${item.subCategoryCode}`}><i className="fa fa-eye" /></Link></td>
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

export default CategoryDetail;
