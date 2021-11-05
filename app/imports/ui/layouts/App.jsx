import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import Signout from '../pages/Signout';
import CreateReport from '../pages/report/CreateReport';
import ViewReport from '../pages/report/ViewReport';
import ListVolunteers from '../pages/admin-exclusive/ListVolunteers';
import CreateAccount from '../pages/admin-exclusive/CreateAccount';
import SideNavBar from '../components/SideNavBar';
import SignIn from '../pages/SignIn';

{ /*import CreateAccountSuccess from '../pages/admin-exclusive/CreateAccountSuccess';*/ }

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <SideNavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={SignIn}/>
              <Route path="/viewReport" component={ViewReport}/>
              <Route path="/createReport" component={CreateReport}/>
              {/* DELETE: <ProtectedRoute path="/list" component={ListStuff}/> */}
              {/* DELETE: <ProtectedRoute path="/edit/:_id" component={EditStuff}/>  */}
              <AdminProtectedRoute path="/volunteers-list" component={ListVolunteers}/>
              <AdminProtectedRoute path="/create-account/create" component={CreateAccount}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isVolunteer = Roles.userIsInRole(Meteor.userId(), 'volunteer');
      return (isLogged && isVolunteer) ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.object.isRequired,
  ]),
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.object.isRequired,
  ]),
  location: PropTypes.object,
};

export default App;
