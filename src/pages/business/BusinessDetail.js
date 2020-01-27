import React, { Component } from 'react';
import {
    Row,
    Breadcrumb,
    BreadcrumbItem, Col, Table,
} from 'reactstrap';
import {Services} from "../../Services";
import {Functions} from "../../Functions";
import Widget from "../../components/Widget";
import cx from "classnames";
import s from "../dashboard/Dashboard.module.scss";

class BusinessDetail extends Component {

    constructor(props) {
        super(props);
        this.services = new Services(this);
        this.funcs = new Functions(this);
        this.state = {
            business: {}
        }
    }

    componentDidMount() {
        this.services.getSingleBusiness(this.getCode())
    }

    getCode = function() {
        const { match: { params } } = this.props;
        this.setState({code: params.id});
        console.log(params);
        return params.id
    };

    render() {
        return (
            <div className={s.root}>
                <Breadcrumb>
                    <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
                    <BreadcrumbItem>Business</BreadcrumbItem>
                    <BreadcrumbItem active>Mama Sasha Shop</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="page-title mb-lg"><span className="fw-semi-bold">Mama Sasha Shop</span></h1>
                <Row>
                    <Col sm={12} md={6}>
                        <Widget
                            title={
                                <div>
                                    <h5 className="mt-0 mb-3">
                                        Business Details
                                    </h5>
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
                                    <td>Display Name</td>
                                    <td>{this.state.business.displayName}</td>
                                </tr>
                                <tr>
                                    <td>Legal or Trading Name</td>
                                    <td>{this.state.business.legalOrTradingName}</td>
                                </tr>
                                <tr>
                                    <td>Registration Number</td>
                                    <td>{this.state.business.registrationNumber}</td>
                                </tr>
                                <tr>
                                    <td>Date Created</td>
                                    <td>{this.state.business.registrationDate}</td>
                                </tr>
                                <tr>
                                    <td>Company Code</td>
                                    <td>{this.state.business.companyCode}</td>
                                </tr>
                                <tr>
                                    <td>County</td>
                                    <td>{this.state.business.countyOrState}</td>
                                </tr>
                                <tr>
                                    <td>Postal Code</td>
                                    <td>{this.state.business.postalCode}</td>
                                </tr>
                                <tr>
                                    <td>Postal Address</td>
                                    <td>{this.state.business.postalAddress}</td>
                                </tr>
                                <tr>
                                    <td>City or Town</td>
                                    <td>{this.state.business.cityOrTown}</td>
                                </tr>
                                <tr>
                                    <td>Street</td>
                                    <td>{this.state.business.street}</td>
                                </tr>
                                <tr>
                                    <td>Building Name or Number</td>
                                    <td>{this.state.business.buildingNameOrNumber}</td>
                                </tr>
                                <tr>
                                    <td>Primary Phne Number</td>
                                    <td>{this.state.business.primaryPhoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Secondary Phone Number</td>
                                    <td>{this.state.business.secondaryPhoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Primary Phne Number</td>
                                    <td>{this.state.business.secondaryPhoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Email </td>
                                    <td>{this.state.business.emailAddress}</td>
                                </tr>
                                <tr>
                                    <td>Website</td>
                                    <td>{this.state.business.website}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{this.state.business.status}</td>
                                </tr>
                                <tr>
                                    <td>Active</td>
                                    <td>{this.state.business.active}</td>
                                </tr>
                                <tr>
                                    <td>Owner Code</td>
                                    <td>{this.state.business.ownerCode}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Widget>
                    </Col>
                    <Col sm={12} md={6}>
                        <Widget
                            title={
                                <div>
                                    <h5 className="mt-0 mb-3">
                                        <i className="fa fa-shopping-cart mr-xs opacity-70" />{' '}
                                        Performing Products
                                    </h5>
                                </div>
                            }
                        >
                            <Table responsive borderless className={cx('mb-0', s.usersTable)}>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Alice</td>
                                    <td>Ksh. 400</td>
                                    <td>
                                        <span className="py-0 px-1 bg-success rounded text-white">active</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Bob</td>
                                    <td>bob@email.com</td>
                                    <td>
                                        <span className="py-0 px-1 bg-warning rounded text-white">delayed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Duck</td>
                                    <td>duck@email.com</td>
                                    <td>
                                        <span className="py-0 px-1 bg-success rounded text-white">active</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Shepherd</td>
                                    <td>shepherd@email.com</td>
                                    <td>
                                        <span className="py-0 px-1 bg-danger rounded text-white">removed</span>
                                    </td>
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

export default BusinessDetail;
