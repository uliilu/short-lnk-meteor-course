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
                <div className="row">
                    <div className="col s12">
                        <h5>{this.props.url}</h5>
                        <p className="linkitem__message">{this.props.shortUrl}</p>
                        {this.renderStats()}
                        <div>
                            <a href={this.props.shortUrl} target="_blank" className="btn waves-effect waves-light">Besuchen <i className="material-icons left">link</i></a>
                            <a ref="kopieren" data-clipboard-text={this.props.shortUrl} className="btn waves-effect waves-light">
                                {this.state.justCopied ? 'Link kopiert!' : 'Kopieren'} <i className="material-icons left">content_copy</i>
                            </a>
                            <a onClick={() => {
                                Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                            }} className="btn waves-effect waves-light">
                                {this.props.visible ? 'Verstecken' : 'Zeigen'} <i className="material-icons left">{this.props.visible ? 'visibility_off' : 'visibility'}</i>
                            </a>
                        </div>
                    </div>
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