import React, { Component } from 'react';
import {
    Row,
    Col,
    Table,
    Progress,
    Button,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Badge,
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


class CreateProductCategory extends Component {

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
            productCategoryCode: this.state.productCategoryCode,
            productCategoryDescription: this.state.productCategoryDescription
        };
        this.services.createProductCategory(data)
    };

    componentDidMount() {
        // this.services.getAllBusinesses();
    }

    render() {
        return (
            <div>
                {this.state.alert}
                <Breadcrumb>
                    <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
                    <BreadcrumbItem active>Product Category</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="page-title mb-lg"><span className="fw-semi-bold">Create</span></h1>
                        <Widget
                            title={<h5>
                                Create A product Category
                            </h5>} settings close
                        >
                            <Form>
                                <Row form>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="productCategoryDescription">Description</Label>
                                            <Input
                                                onFocus={this.funcs.handleFocus}
                                                onBlur={this.funcs.handleBlur}
                                                onChange={this.funcs.handleChange}
                                                // value={this.state.legalOrTradingName}
                                                type="text" name="productCategoryDescription" id="productCategoryDescription"
                                                placeholder="" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={8} className="" />
                                    <Col md={4} className="pull-right">
                                        <Link to="/app/product-category" className="btn btn-outline-success">
                                            <i className="fa fa-arrow-left" /> Back to List
                                        </Link>
                                        <Button className="pull-right btn-info" onClick={this.funcs.handleClickSubmit}>Submit</Button>
                                    </Col>

                                </Row>
                            </Form>
                        </Widget>
            </div>
        );
    }
}

export default CreateProductCategory;
