import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied: false
        };
    }
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.kopieren);
        this.clipboard.on('success', () => {
            // console.log(this.state.justCopied);
            // console.log('Hat funktioniert!');
            this.setState({ justCopied: true });
            // console.log(this.state.justCopied);
            // setTimeout(() => {
            //     this.setState({ justCopied: false });
            // }, 1500);
            // Dies geht auch: expression syntax
            setTimeout(() => this.setState({ justCopied: false }), 1500);
        }).on('error', () => {
            console.log('Kann nichts kopieren. Den Link bitte manuell kopieren.');
        });
    }
    componentWillUnmount() {
        this.clipboard.destroy();
    }
    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMessage = null;

        if(typeof this.props.lastVisitedAt === 'number') {
            visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
        }
        return <p className="linkitem__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>;
    }
    render() {
        return (
            <div className="linkitem">
                <h2>{this.props.url}</h2>
                <p className="linkitem__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <div>
                    <a href={this.props.shortUrl} target="_blank" className="button button--pill button--link">Besuchen</a>
                    <button ref="kopieren" data-clipboard-text={this.props.shortUrl} className="button button--pill">
                        {this.state.justCopied ? 'Link kopiert!' : 'Kopieren'}
                    </button>
                    <button onClick={() => {
                        Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                    }} className="button button--pill">
                        {this.props.visible ? 'Verstecken' : 'Zeigen'}
                    </button>
                </div>
            </div>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
};