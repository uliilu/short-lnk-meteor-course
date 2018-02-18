import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }
    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;

        Meteor.loginWithPassword({email}, password, (err) => {
            if(err) {
                console.log('err',err);
                this.setState({error: err.reason});
            } else {
                this.setState({error: ''});
                this.props.history.push('/links');
            }
        });
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Short Lnk Login</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                        <div className="input-field col s12">
                            <input id="email" name="email" ref="email" type="email" className="validate"/>
                            <label htmlFor="email">eMail</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" ref="password" name="password" type="password" className="validate"/>
                            <label htmlFor="password">Passwort</label>
                        </div>
                        <button className="btn waves-effect waves-light">Einloggen</button>
                    </form>
                    <p>
                        <Link to="/signup">Benötigst Du ein Konto?</Link>
                    </p>
                </div>
            </div>
        );
    }
}
