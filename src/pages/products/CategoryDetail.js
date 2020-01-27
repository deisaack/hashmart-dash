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
            subCategoryList: []
        }
    }

    componentDidMount() {
        this.services.getSingleProductCategory(this.getCode())
    }

    getCode = function() {
        const { match: { params } } = this.props;
        this.setState({code: params.id});
        console.log(params);
        return params.id
    };

    subCategoryForm = () => {
        this.setState({form: "subCategory"})
    };

    submitForm = () => {
        let data = {
            "categoryDescription": this.state.categoryDescription,
            "imageUrl": this.state.imageUrl,
            "productCategoryCode": this.state.code,
        };
        this.services.createCategory(data)
    };




    render() {
        return (
            <div className={s.root}>
                {this.state.alert}
                <Breadcrumb>
                    <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
                    <BreadcrumbItem>Product Categories</BreadcrumbItem>
                    <BreadcrumbItem>Categories</BreadcrumbItem>
                    <BreadcrumbItem active>{this.state.category.productCategoryCode}</BreadcrumbItem>
                </Breadcrumb>
            <h1 className="page-title mb-lg"><span className="fw-semi-bold">{this.state.category.productCategoryDescription}</span></h1>
                <Widget>
                    <Row>
                        <Col sm={2}>
                            {/*<Button className="pull-right btn btn-success btn-sm" onClick={()=>this.setState({"subCategory"})}>*/}
                            {/*    <i className="fa fa-cloud-upload" /> Create*/}
                            {/*</Button>*/}
                        </Col>
                        <Col sm={2}>
                            <Button className="pull-right btn btn-success btn-sm" onClick={this.imageUploadForm}>
                                <i className="fa fa-cloud-upload" /> Upload Image
                            </Button>
                        </Col>
                    </Row>
                </Widget>
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

                {this.state.form === "imageUpload" ? (
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
                                    <td>{this.state.category.productCategoryCode}</td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>{this.state.category.productCategoryDescription}</td>
                                </tr>
                                <tr>
                                    <td>Date Created</td>
                                    <td>{this.state.category.dateCreated}</td>
                                </tr>
                                <tr>
                                    <td>Created By</td>
                                    <td>{this.state.category.createdByName}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Widget>
                    </Col>
                    <Col sm={12} md={6}>
                        <Widget
                            title={
                                <Row style={{marginBottom: "5px"}}>
                                    <Col sm={8}>
                                        <h5>Sub Categories</h5>
                                    </Col>
                                    <Col sm={4}>
                                        <Button className="pull-right btn btn-success btn-sm" onClick={this.categoryForm}>
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
                                    <th>Name</th>
                                    <th className="hidden-sm-down">County</th>
                                    <th className="hidden-sm-down">Phone</th>
                                    <th className="hidden-sm-down">Status</th>
                                    <th />
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.subCategoryList.map((item, key) =>
                                        <tr key={key}>
                                            <td>{key+1}</td>
                                            <td>{item.companyCode}</td>
                                            <td>{item.legalOrTradingName}</td>
                                            <td>{item.countyOrState}</td>
                                            <td>{item.primaryPhoneNumber}</td>
                                            <td>{item.status}</td>
                                            <td><Link to={`/app/category/view/1${item.companyCode}`}><i className="fa fa-eye" /></Link></td>
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
