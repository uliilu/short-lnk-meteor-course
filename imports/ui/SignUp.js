import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class SignUp extends React.Component {
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

        if(password.length < 9) {
            return this.setState({ error: 'Das Passwort muss mindestens 9 Zeichen lang sein!'});
        }
        Accounts.createUser({email, password}, (err) => {
            if(err) {
                this.setState({error: err.reason});
            } else {
                this.setState({error: ''});
            }
            // console.log('Signup callback: ', err);
        });
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join Short Lnk</h1>
                    {this.state.error ? <h2>{this.state.error}</h2> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="eMail"/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Abschicken</button>
                    </form>
                    <p>
                        <Link to="/">Du hast bereits ein Konto!?!</Link>
                    </p>
                </div>
            </div>
        );
    }
}

