import React, {Component} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Alert,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Progress,
  Badge,
  ListGroup,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Table
} from 'reactstrap';
import { mock } from './mock'

import Widget from '../../components/Widget';

import { fetchPosts } from '../../actions/posts';
import s from './Dashboard.module.scss';
import LineChart from "../charts/charts/LineChart";
import SalesTrendLineChart from "./SalesTrendLineChart";


const chartData = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
class Dashboard extends Component {
  /* eslint-disable */
  static propTypes = {
    posts: PropTypes.any,
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };
  /* eslint-enable */

  static defaultProps = {
    posts: [],
    isFetching: false,
  };

  state = {
    isDropdownOpened: false
  };

  componentDidMount() {
    // if(process.env.NODE_ENV === "development") {
    //   this.props.dispatch(fetchPosts());
    // }
  }

  formatDate = (str) => {
    return str.replace(/,.*$/,"");
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isDropdownOpened: !prevState.isDropdownOpened,
    }));
  };

  render() {
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>HASHMART ADMIN</BreadcrumbItem>
          <BreadcrumbItem active>Dashboard</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Dashboard</h1>
        <Row>
          <Col sm={6} md={3}>
            <Widget
                title={
                  <div>
                    <h5 className="mt-0 mb-6">
                      <i className="fa fa-user mr-xs opacity-70" />{' '}
                      400 Users
                    </h5>
                  </div>
                }
            >
            </Widget>
          </Col>
          <Col sm={6} md={3}>
            <Widget
                title={
                  <div>
                    <h5 className="mt-0 mb-6">
                      <i className="fa fa-briefcase mr-xs opacity-70" />{' '}
                      26 Businesses
                    </h5>
                  </div>
                }
            >
            </Widget>
          </Col>
          <Col sm={6} md={3}>
            <Widget
                title={
                  <div>
                    <h5 className="mt-0 mb-6">
                      <i className="fa fa-shopping-basket mr-xs opacity-70" />{' '}
                      12 Active Orders
                    </h5>
                  </div>
                }
            >
            </Widget>
          </Col>
          <Col sm={6} md={3}>
            <Widget
                title={
                  <div>
                    <h5 className="mt-0 mb-6">
                      <i className="fa fa-audio-description mr-xs opacity-70" />{' '}
                      9 New Requests
                    </h5>
                  </div>
                }
            >
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Widget
                title={
                  <div>
                    <div className="pull-right mt-n-xs">
                      <input
                          type="search"
                          placeholder="Search ..."
                          className="form-control input-sm"
                      />
                    </div>
                    <h5 className="mt-0 mb-3">
                      <i className="fa fa-shopping-cart mr-xs opacity-70" />{' '}
                      Recent Orders
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
          <Col sm={12} md={6}>
            <Widget
                title={
                  <div>
                    <div className="pull-right mt-n-xs">
                      <input
                          type="search"
                          placeholder="Search ..."
                          className="form-control input-sm"
                      />
                    </div>
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
        <Row>
          <Col xs={12} md={12}>
            <Widget
                title={<h5>Simple <span className="fw-semi-bold">Sales Trend</span></h5>}>
              <SalesTrendLineChart data={chartData} />
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    posts: state.posts.posts,
  };
}

export default connect(mapStateToProps)(Dashboard);
