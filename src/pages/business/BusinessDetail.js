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
import {Link} from "react-router-dom";

class BusinessDetail extends Component {

    constructor(props) {
        super(props);
        this.services = new Services(this);
        this.funcs = new Functions(this);
        this.state = {
            business: {},
            productList: []
        }
    }

    componentDidMount() {
        this.services.getSingleBusiness(this.getCode())
        this.services.getBusinessProducts("BS00000012")

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
                    <Col sm={12}>
                    <Widget>
                        <Row>
                        <Col sm={12} md={4}>
                            <Table responsive bordered striped>
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
                                    </tbody>
                                </Table>
                        </Col>
                            <Col sm={12} md={4}>
                                <Table responsive bordered striped>
                                    <tbody>
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


                                    </tbody>
                                </Table>
                            </Col>
                            <Col sm={12} md={4}>
                                <Table responsive bordered striped>
                                    <tbody>
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
                            </Col>
                        </Row>
                    </Widget>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Widget
                            title={
                                <Row style={{marginBottom: "5px"}}>
                                    <Col sm={8}>
                                        <h5><span className="fw-semi-bold">Product</span></h5>
                                    </Col>
                                    <Col sm={4}>
                                        {/*<Button className=" btn btn-indigo btn-sm" onClick={this.showMyBusinesses}>*/}
                                        {/*    <i className="fa fa-institution" /> My Businesses*/}
                                        {/*</Button>*/}
                                        {/*<Button className="pull-right btn btn-success btn-sm" onClick={this.addBusiness}>*/}
                                        {/*    <i className="fa fa-plus" /> Add*/}
                                        {/*</Button>*/}
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
                                    <th className="hidden-sm-down">Available Quantity</th>
                                    <th className="hidden-sm-down">Price</th>
                                    <th className="hidden-sm-down">Discount</th>
                                    <th className="hidden-sm-down">Actual Amount</th>
                                    <th />
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.productList.map((item, key) =>
                                        <tr key={key}>
                                            <td>{key+1}</td>
                                            <td>{item.productCode}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.availableQuantity}</td>
                                            <td>Ksh {item.price}</td>
                                            <td>{item.discount}</td>
                                            <td>{item.actuaLAmount}</td>
                                            <td>
                                                <Link to={`/app/product/${item.productCode}`}><i className="fa fa-eye" />
                                                </Link>
                                            </td>
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

export default BusinessDetail;
