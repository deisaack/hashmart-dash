import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ErrorPage from '../pages/error';

import '../styles/theme.scss';
import LayoutComponent from '../components/Layout';
//import DocumentationLayoutComponent from '../documentation/DocumentationLayout';
import Login from '../pages/login';
import Register from '../pages/register';
import NotFound from "../pages/notFound";

const PrivateRoute = ({dispatch, component, ...rest }) => {
    let from = new Date(localStorage.getItem("created"));
    let expiry = from.setMinutes(from.getMinutes() + 10);
    let now = new Date();
    if (now < expiry) {
    //     dispatch(logoutUser());
        return (<Redirect to="/login"/>)
    } else {
        return ( // eslint-disable-line
            <Route {...rest} render={props => (React.createElement(component, props))}/>
        );
    }
};

// const PrivateRoute = ({dispatch, component, ...rest }) => {
//     if (!Login.isAuthenticated(localStorage.getItem('token'))) {
//         dispatch(logoutUser());
//         return (<Redirect to="/login"/>)
//     } else {
//         return ( // eslint-disable-line
//             <Route {...rest} render={props => (React.createElement(component, props))}/>
//         );
//     }
// };

const CloseButton = ({closeToast}) => <i onClick={closeToast} className="la la-close notifications-close"/>

class App extends React.PureComponent {
  render() {
    return (
        <div>
            <ToastContainer
                autoClose={5000}
                hideProgressBar
                closeButton={<CloseButton/>}
            />
            <HashRouter>
                <Switch>
                    {/*<Route path="/" exact render={() => <Redirect to="/app/main"/>}/>*/}
                    {/*<Route path="/app" exact render={() => <Redirect to="/app/main"/>}/>*/}
                    <PrivateRoute path="/app" dispatch={this.props.dispatch} component={LayoutComponent}/>
                    {/*<Route path="/documentation" exact*/}
                    {/*       render={() => <Redirect to="/documentation/getting-started/overview"/>}/>*/}
                    {/* <Route path="/documentation" component={DocumentationLayoutComponent}/> */}
                    <Route path="/register" exact component={Register}/>
                    <Route path="/" exact component={Login}/>
                    <Route path="/error" exact component={ErrorPage}/>
                    <Route component={NotFound} />
                </Switch>
            </HashRouter>
        </div>

    );
  }
}

export default App;
