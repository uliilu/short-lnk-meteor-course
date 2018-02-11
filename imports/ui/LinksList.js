import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
// react-flip-move importieren, um die Listendarstellung zu animieren
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem.js';

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }
    componentDidMount() {
        // console.log('Component mounted!');
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('publinks');
            const links = Links.find({
                // showVisible wird erstmals in client/main.js gesetzt
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({ links });
            // console.log('New Links',links);
        });
    }
    componentWillUnmount() {
        // console.log('Component wil Unmount LinksList!');
        this.linksTracker.stop();
    }
    renderLinksListItems() {
        if(!this.state.links.length) {
            return (
                <div className="linkitem">
                    <p className="linkitem__status-message">Keine {Session.get('showVisible') ? 'sichtbaren' : 'versteckten'} Verknüpfungen vorhanden!</p>
                </div>
            );
        }
        // return this.state.links.map((link) => <p key={link._id}><a href={link._id} target="_blank">{link.url}</a></p>);
        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
        });
        // if(this.state.links.length) {
        //     // return this.state.links.map((link) => <p key={link._id}><a href={link._id} target="_blank">{link.url}</a></p>);
        //     return this.state.links.map((link) => {
        //         const shortUrl = Meteor.absoluteUrl(link._id);
        //         return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
        //     });
        // } else {
        //     return (
        //         <div>
        //             <p>Keine {Session.get('showVisible') ? 'sichtbaren' : 'versteckten'} Verknüpfungen vorhanden!</p>
        //         </div>
        //     );
        // }
    }
    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
}
