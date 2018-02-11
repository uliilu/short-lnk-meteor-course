import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import SignUp from './../ui/SignUp';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

const history = createHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
    // console.log('replacing with links');
    if(Meteor.userId()) {
        history.push('/links');
    }
};

const onEnterPrivatePage = () => {
    // console.log('replacing with /');
    if(!Meteor.userId()) {
        history.push('/');
    }
};

history.listen((location, action) => {
    let pathname = location.pathname;
    // console.log(`The current URL is ${pathname}${location.search}${location.hash}`);
    // console.log(`Aktuelle URL: ${pathname}`);
    // console.log(`The last navigation action was ${action}`);
    if(Meteor.userId() && unauthenticatedPages.includes(pathname)) {
        // history.push('/links');
        history.replace('/links');
    }
    if(!Meteor.userId() && authenticatedPages.includes(pathname)) {
        // history.push('/');
        history.replace('/');
    }
});
export const onAuthChange = (isAuthenticated) => {
    // console.log('onAuthChange isAuthenticated', isAuthenticated);

    const pathname = history.location.pathname;
    // console.log('pathname',pathname);
    // console.log('authenticatedPages.includes(pathname)',authenticatedPages.includes(pathname));

    if (isAuthenticated && unauthenticatedPages.includes(pathname)) {
        // console.log('replacing with links');
        return history.replace('/links');
        // return history.push('/links');
    } else if (!isAuthenticated && authenticatedPages.includes(pathname)) {
        // console.log('replacing with /');
        return history.replace('/');
        // return history.push('/');
    }
};

export const routes = (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/links" component={Link} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);