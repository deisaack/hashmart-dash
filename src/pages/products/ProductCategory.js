import React, { Component } from 'react';
import {
    Row,
    Col,
    Table,
    Breadcrumb,
    BreadcrumbItem,
} from 'reactstrap';

import Widget from '../../components/Widget';
import s from '../../styles/Static.module.scss';
import {Link} from "react-router-dom";
import {Services} from "../../Services";
import {Functions} from "../../Functions";


class ProductCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productCategoryList: [],
            addBusiness: false,
            invalidFields: [],
            validFields: [],
            alert: ""
        };
        this.services = new Services(this);
        this.funcs = new Functions(this, )
    }

    addBusiness = () => {
        this.setState({addBusiness: true})
    };

    showMyBusinesses = () => {
        this.services.getMyBusinesses();
    };

    submitForm = () => {
        let data = {
            "productCategoryCode": this,
            "productCategoryDescription": "string",
        };
        this.services.createProductCategory(data)
    };

    componentDidMount() {
        this.services.getAllProductCategories();
    }

    render() {
        return (
            <div>
                {this.state.alert}
                <Breadcrumb>
                    <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
                    <BreadcrumbItem active>Product Category</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="page-title mb-lg"><span className="fw-semi-bold">Product Categories</span></h1>
                <Row>
                    <Col sm={12}>
                        <Widget
                            title={
                                <Row style={{marginBottom: "5px"}}>
                                    <Col sm={8}>
                                        <h5>Product  Categories</h5>
                                    </Col>
                                    <Col sm={4}>

                                        <Link to="/app/product-category/create" className="btn btn-outline-success btn-sm pull-right">
                                            <i className="fa fa-plus" /> Add
                                        </Link>
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
                                    <th className="hidden-sm-down">Date Created</th>
                                    <th className="hidden-sm-down">Created By</th>
                                    <th />
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.productCategoryList.map((item, key) =>
                                        <tr key={key}>
                                            <td>{key+1}</td>
                                            <td>{item.productCategoryCode}</td>
                                            <td>{item.productCategoryDescription}</td>
                                            <td>{item.dateCreated}</td>
                                            <td>{item.createdByName}</td>
                                            <td><Link to={`/app/product-category/view/${item.productCategoryCode}`}><i className="fa fa-eye" /></Link></td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        </Widget>
                    </Col>
                    }
                </Row>
            </div>
        );
    }

}

export default ProductCategory;
