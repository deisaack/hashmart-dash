import React from 'react';
import cx from 'classnames';
import { Switch, Route, withRouter } from 'react-router';

import s from './Layout.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard'
import Buttons from '../../pages/buttons'
import Charts from '../../pages/charts'
import Maps from '../../pages/google'
import NotFound from '../../pages/notFound'
import Icons from '../../pages/icons'
import Typography from '../../pages/typography'
import Tables from '../../pages/tables'
import Notifications from '../../pages/notifications'
import Posts from '../../pages/posts'
import Profile from '../../pages/profile'
import Privacy from '../../pages/privacy'
import OldDashboard from "../../pages/dashboard/OldDashboard";
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

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
    };
  }

  render() {
    return (
      <div className={s.root}>
        <Sidebar />
        <div
          className={cx(s.wrap, {[s.sidebarOpen]: this.state.sidebarOpen})}
        >
          <Header
            sidebarToggle={() =>
              this.setState({
                sidebarOpen: !this.state.sidebarOpen,
              })
            }
          />
          <main className={s.content}>
            <Switch>
              <Route path="/app/admin" exact component={OldDashboard} />
              <Route path="/app/main" exact component={Dashboard} />
              <Route path="/app/product-category" exact component={ProductCategory} />
              <Route path="/app/product-category/create" exact component={CreateProductCategory} />
              <Route path="/app/product-category/view/:id" exact component={ProductCategoryView} />
              <Route path="/app/category/:productCategory/:id" exact component={CategoryDetail} />
              <Route path="/app/sub-category/:productCategoryCode/:categoryCode/:subCategoryCode" exact component={SubCategory} />
              <Route path="/app/brand/:productCategoryCode/:categoryCode/:subCategoryCode/:brandCode" exact component={Brand} />
              <Route path="/app/business" exact component={BusinessList} />
              <Route path="/app/products" exact component={ProductList} />
              <Route path="/app/product/:productCode" exact component={ProductDetail} />
              <Route path="/app/business/:id" exact component={BusinessDetail} />
              <Route path="/app/typography" exact component={Typography} />
              <Route path="/app/tables" exact component={Tables} />
              <Route path="/app/posts" component={Posts} />
              <Route path="/app/privacy" exact component={Privacy} />
              <Route path="/app/profile" exact component={Profile} />
              <Route path="/app/notifications" exact component={Notifications} /> 
              <Route path="/app/components/buttons" exact component={Buttons} />
              <Route path="/app/components/charts" exact component={Charts} />
              <Route path="/app/components/icons" exact component={Icons} />
              <Route path="/app/components/maps" exact component={Maps} />
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
