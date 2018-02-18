import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showVisible: true
        };
    }
    componentDidMount() {
        this.filtersTracker = Tracker.autorun(() => {
            this.setState({ showVisible: Session.get('showVisible') });
        });
    }
    componentWillUnmount() {
        this.filtersTracker.stop();
    }
    render() {
        return (
            <div>
                <input className="filled-in" id="filled-in-box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
                    // console.log('Checked?', e.target.checked);
                    Session.set('showVisible', !e.target.checked);
                }}/>
                <label className="checkbox" for="filled-in-box">
                    Zeig {Session.get('showVisible') ? 'versteckte' : 'sichtbare'} Links
                </label>
            </div>
        );
    }
}