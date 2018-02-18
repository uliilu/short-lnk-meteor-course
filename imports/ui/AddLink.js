import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        };
    }
    onSubmit(e) {
        e.preventDefault();
        // uncontrolled input field
        // const url = this.refs.url.value.trim();

        // controlled input field
        // const url = this.state.url;
        // Oder vom Ergebnis her identisch! Sogenanntes "ES6 destructuring"
        const { url } = this.state;

        // if(url) {
        Meteor.call('methLinks.insert', url, (err,res) => {
            if(!err) {
                // this.setState({ url: '', isOpen: false, error: '' });
                this.modalClose();
            } else {
                this.setState({ error: err.reason });
            }
        });
        // Links.insert({ url, userId: Meteor.userId() });
        // this.refs.url.value = '';
        // }
    }
    onChange(e) {
        this.setState({
            url: e.target.value
        });
    }
    modalClose() {
        this.setState({ isOpen: false, url: '', error: '' });
    }
    render() {
        return (
            <div>
                <button className="btn waves-effect waves-light" onClick={() => this.setState({ isOpen: true })} className="button">+ Link hinzufügen</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.modalClose.bind(this)}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                    ariaHideApp={false}
                >
                    <p>Link hinzufügen</p>
                    { this.state.error ? <p>{this.state.error}</p> : undefined }
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input
                            type="text"
                            placeholder="URL"
                            value={this.state.url}
                            ref="url"
                            onChange={this.onChange.bind(this)}
                        />
                        <button className="btn waves-effect waves-light mb1rem">Hinzufügen</button>
                        <button type="button" onClick={this.modalClose.bind(this)} className="btn waves-effect waves-light light-blue lighten-4">Abbrechen</button>
                    </form>
                </Modal>
            </div>
        );
    }
}