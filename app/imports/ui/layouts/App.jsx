import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import NavBar from '../components/NavBar';
// import SideNavBar from '../components/SideNavBar';
// import SideNavBar2 from '../components/SideNavBar2';
import Landing from '../pages/Landing';
import NotFound from '../components/NotFound';
import CreateReport from '../pages/report/CreateReport';
import ViewReport from '../pages/report/ViewReport';
import SearchReport from '../pages/report/SearchReport';
import ListVolunteers from '../pages/admin-exclusive/ListVolunteers';
import CreateAccount from '../pages/admin-exclusive/CreateAccount';
import SignIn from '../pages/SignIn';
import ListAdmins from '../pages/admin-exclusive/ListAdmins';
import AuditLog from '../pages/admin-exclusive/AuditLog';
import Dashboard from '../pages/Dashboard';
import Resources from '../pages/Resources';
import SignOut from '../pages/SignOut';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { isLogged, isAdmin } = useTracker(() => ({
    isLogged: Meteor.userId(),
    isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin'),
  }), []);

  return (
    <Router>
      <div>
        <NavBar/>
        {/* <SideNavBar2/> */}
        <Switch>
          <ProtectedRoute path="/volunteer/dashboard" component={Dashboard}/>
          <ProtectedRoute path="/volunteer/viewReport" component={ViewReport}/>
          <ProtectedRoute path="/volunteer/searchReport" component={SearchReport}/>
          <AdminProtectedRoute path="/admin/dashboard" component={Dashboard}/>
          <AdminProtectedRoute path="/admin/viewReport" component={ViewReport}/>
          <AdminProtectedRoute path="/admin/searchReport" component={SearchReport}/>
          <AdminProtectedRoute path="/admin/volunteers-list" component={ListVolunteers}/>
          <AdminProtectedRoute path="/admin/staff-list" component={ListAdmins}/>
          <AdminProtectedRoute path="/admin/audit-log" component={AuditLog}/>
          <AdminProtectedRoute path="/admin/create-account" component={CreateAccount}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/createReport" component={CreateReport}/>
          <Route path="/resources" component={Resources}/>
          <Route path="/public-landing" component={Landing}/>
          <Route path="/sign-out" component={SignOut}/>
          <Route exact path="/">
            {isLogged ?
              <Redirect to={isAdmin ? '/admin/viewReport' : '/volunteer/viewReport'}/>
              : <Redirect to={'/public-landing'}/>
            }
          </Route>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
};

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLogged, isVolunteer } = useTracker(() => ({
    isLogged: Meteor.userId(),
    isVolunteer: Roles.userIsInRole(Meteor.userId(), 'volunteer'),
  }), []);

  const history = useHistory();
  const goToPage = () => {
    const pageLink = '/signin';
    history.push(pageLink);
  };

  return (
    <Route
      {...rest}
      render={(props) => (
        (isLogged && isVolunteer) ?
          (<Component {...props} />) :
          (goToPage()))}
    />
  );
};

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLogged, isAdmin } = useTracker(() => ({
    isLogged: Meteor.userId(),
    isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin'),
  }), []);

  const history = useHistory();
  const goToPage = () => {
    const pageLink = '/signin';
    history.push(pageLink);
  };

  return (
    <Route
      {...rest}
      render={(props) => (
        (isLogged && isAdmin) ?
          (<Component {...props} />) :
          (goToPage())
      )}
    />
  );
};

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.object.isRequired,
  ]),
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.object.isRequired,
  ]),
};

export default App;
