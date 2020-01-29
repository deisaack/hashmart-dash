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


class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productList: [],
            alert: ""
        };
        this.services = new Services(this);
        this.funcs = new Functions(this,)
    }

    componentDidMount() {
        this.services.getAllProducts();
    }

    render() {
        return (
            <div>
                {this.state.alert}
                <Breadcrumb>
                    <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
                    <BreadcrumbItem active>Products</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="page-title mb-lg"><span className="fw-semi-bold">Products</span></h1>
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
                                    <th className="hidden-sm-down">Description</th>
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
                                            <td>{item.description}</td>
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
export default ProductList;
