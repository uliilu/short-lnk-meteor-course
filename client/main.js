import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import {routes, onAuthChange } from './../imports/routes/routes.js';
import '../imports/startup/simpl-schema-configuration.js';

// Tracker.autorun(() => {
//     const showVisible = Session.get('showVisible');
//     console.log('In Tracker.autorun - showVisible: ',showVisible);
// });

// Session.set('showVisible',true);

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    Session.set('showVisible', true);
    ReactDOM.render(routes, document.getElementById('app'));
});
