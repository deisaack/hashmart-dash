import React, { Component } from 'react';
import {
    Row,
    Col,
    Table,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    FormGroup,
    Form,
    Label,
    Input
} from 'reactstrap';

import Widget from '../../components/Widget';
import s from '../../styles/Static.module.scss';
import {Link} from "react-router-dom";
import {Services} from "../../Services";
import {Functions} from "../../Functions";


class BusinessList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            businessList: [],
            addBusiness: false,
            invalidFields: [],
            validFields: [],
            alert: ""
        };
        this.services = new Services(this);
        this.funcs = new Functions(this, 'displayName', 'legalOrTradingName', 'registrationNumber',
            'companyCode', 'countyOrState', 'postalCode', 'postalAddress', 'cityOrTown', 'street',
            'buildingNameOrNumber', 'primaryPhoneNumber', 'secondaryPhoneNumber', 'emailAddress', 'website',
            'status', 'active', 'active')
    }

    addBusiness = () => {
        this.setState({addBusiness: true})
    };

    showMyBusinesses = () => {
        this.services.getMyBusinesses();
    };

    submitForm = () => {
        let data = {
            "displayName": this.state.displayName,
            "legalOrTradingName": this.state.legalOrTradingName,
            "registrationNumber": this.state.registrationNumber,
            "companyCode": this.state.companyCode,
            "countyOrState": this.state.countyOrState,
            "postalCode": this.state.postalCode,
            "postalAddress": this.state.postalAddress,
            "cityOrTown": this.state.cityOrTown,
            "street": this.state.street,
            "buildingNameOrNumber": this.state.buildingNameOrNumber,
            "primaryPhoneNumber": this.state.primaryPhoneNumber,
            "secondaryPhoneNumber": this.state.secondaryPhoneNumber,
            "emailAddress": this.state.email,
            "website": this.state.website,
            // "status": "string",
            // "active": "string",
            "ownerCode": this.state.ownerCode
        }
        this.services.createBusiness(data)
    };

    componentDidMount() {
        this.services.getAllBusinesses();
    }

    render() {
        return (
            <div>
                {this.state.alert}
                <Breadcrumb>
                    <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
                    <BreadcrumbItem active>Businesses</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="page-title mb-lg"><span className="fw-semi-bold">Businesses</span></h1>
                {this.state.addBusiness ? (
                        <Widget
                            title={<h5>
                                Create A Business
                            </h5>} settings close
                        >
                            <Form>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="displayName">Display Name</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                type="text" name="displayName" id="displayName"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="legalOrTradingName">Legal or Trading Name</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.legalOrTradingName}
                                                type="text" name="legalOrTradingName" id="legalOrTradingName"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="companyCode">Company Code</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.companyCode}
                                                type="text" name="companyCode" id="companyCode"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="registrationNumber">Registration No</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.registrationNumber}
                                                type="text" name="registrationNumber" id="registrationNumber"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="countyOrState">County</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.countyOrState}
                                                type="text" name="countyOrState" id="countyOrState"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="postalCode">Postal Code</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.postalCode}
                                                type="text" name="postalCode" id="postalCode"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="postalAddress">Postal Address</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.postalAddress}
                                                type="text" name="postalAddress" id="postalAddress"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="cityOrTown">City</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.cityOrTown}
                                                type="text" name="cityOrTown" id="cityOrTown"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="street">Street</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.street}
                                                type="text" name="street" id="street"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="buildingNameOrNumber">Building Name</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.buildingNameOrNumber}
                                                type="text" name="buildingNameOrNumber" id="buildingNameOrNumber"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="primaryPhoneNumber">Phone</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.primaryPhoneNumber}
                                                type="text" name="primaryPhoneNumber" id="primaryPhoneNumber"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="secondaryPhoneNumber">Secondary Phone Number</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.secondaryPhoneNumber}
                                                type="text" name="secondaryPhoneNumber" id="secondaryPhoneNumber"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="emailAddress">Email</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.emailAddress}
                                                type="text" name="emailAddress" id="emailAddress"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="website">Website</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.website}
                                                type="text" name="website" id="website"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Button className="pull-right btn-info" onClick={this.funcs.handleClickSubmit}>Submit</Button>
                                </Row>
                            </Form>
                        </Widget>)
                    : ""}
                <Row>
                    <Col sm={12}>
                        <Widget
                            title={
                                <Row style={{marginBottom: "5px"}}>
                                    <Col sm={8}>
                                        <h5>All <span className="fw-semi-bold">businesses</span></h5>
                                    </Col>
                                    <Col sm={4}>
                                        <Button className=" btn btn-indigo btn-sm" onClick={this.showMyBusinesses}>
                                            <i className="fa fa-institution" /> My Businesses
                                        </Button>
                                        <Button className="pull-right btn btn-success btn-sm" onClick={this.addBusiness}>
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
                                            this.state.businessList.map((item, key) =>
                                                <tr key={key}>
                                                    <td>{key+1}</td>
                                                    <td>{item.companyCode}</td>
                                                    <td>{item.legalOrTradingName}</td>
                                                    <td>{item.countyOrState}</td>
                                                    <td>{item.primaryPhoneNumber}</td>
                                                    <td>{item.status}</td>
                                                    <td><Link to={`/app/business/${item.companyCode}`}><i className="fa fa-eye" /></Link></td>
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

export default BusinessList;
