import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simpl-schema-configuration';

Meteor.startup(() => {
    WebApp.connectHandlers.use((req,res,next) => {
        // console.log('This is from my custom middleware');
        // console.log('req.url',req.url);
        // console.log('req.method',req.method);
        // console.log('req.headers',req.headers);
        // console.log('req.query',req.query);
        // set HTTP status code
        // res.statusCode = 404;
        // set HTTP headers
        // res.setHeader('mein-eigener-Header', 'Uli ist da!');
        // set HTTP body
        // res.write('<h1>Dies ist meine middleware bei der Arbeit!</h1>');
        // end HTTP request
        // res.end();
        next();
    });
    WebApp.connectHandlers.use((req,res,next) => {
        const _id = req.url.slice(1);
        // console.log('_id',_id);
        const link = Links.findOne({ _id });
        if(link) {
            // set HTTP status code
            res.statusCode = 302;
            // set HTTP headers
            res.setHeader('Location', link.url);
            // end HTTP request
            res.end();
            Meteor.call('links.trackVisit', _id);
        } else {
            next();
        }
    });
});
