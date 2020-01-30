import React from "react";
import cx from "classnames";
import { Switch, Route, withRouter } from "react-router";

import s from "./Layout.module.scss";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from "../../pages/dashboard";
import NotFound from "../../pages/notFound";
import Profile from "../../pages/profile";
import BusinessList from "../../pages/business/BusinessList";
import BusinessDetail from "../../pages/business/BusinessDetail";
import ProductCategory from "../../pages/products/ProductCategory";
import CreateProductCategory from "../../pages/products/CreateProductCategory";
import ProductCategoryView from "../../pages/products/ProductCategoryView";
import CategoryDetail from "../../pages/products/CategoryDetail";
import SubCategory from "../../pages/products/SubCategory";
import Brand from "../../pages/products/Brand";
import ProductList from "../../pages/products/ProductList";
import ProductDetail from "../../pages/products/ProductDetail";
import Tabbed from "../../pages/products/ProductDetailTab";

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("authToken") === null) {
      window.location.href = "/";
    }
  }

  render() {
    return (
      <div className={s.root}>
        <Sidebar />
        <div
          className={cx(s.wrap, { [s.sidebarOpen]: this.state.sidebarOpen })}
        >
          <Header
            sidebarToggle={() =>
              this.setState({
                sidebarOpen: !this.state.sidebarOpen
              })
            }
          />
          <main className={s.content}>
            <Switch>
              <Route path="/app/main" exact component={Dashboard} />
              <Route
                path="/app/product-category"
                exact
                component={ProductCategory}
              />
              <Route
                path="/app/product-category/create"
                exact
                component={CreateProductCategory}
              />
              <Route
                path="/app/product-category/view/:id"
                exact
                component={ProductCategoryView}
              />
              <Route
                path="/app/category/:productCategory/:id"
                exact
                component={CategoryDetail}
              />
              <Route
                path="/app/sub-category/:productCategoryCode/:categoryCode/:subCategoryCode"
                exact
                component={SubCategory}
              />
              <Route
                path="/app/brand/:productCategoryCode/:categoryCode/:subCategoryCode/:brandCode"
                exact
                component={Brand}
              />
              <Route path="/app/business" exact component={BusinessList} />
              <Route path="/app/products" exact component={ProductList} />
              <Route
                path="/app/product/:productCode"
                exact
                component={Tabbed}
              />
              <Route
                path="/app/business/:id"
                exact
                component={BusinessDetail}
              />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(Layout);
