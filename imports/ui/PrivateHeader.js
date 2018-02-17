import React from 'react';
import { Accounts } from 'meteor/accounts-base';
// Damit der Titel obligat ist!
import PropTypes from 'prop-types';

// export default class PrivateHeader extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     // }
//     hierHin() {
//         Accounts.logout();
//     }
//     render() {
//         return (
//             <div>
//                 <h1>{this.props.titel}</h1>
//                 <button onClick={this.hierHin.bind(this)}>Abmelden</button>
//             </div>
//         );
//     }
// }


// Das Gleiche als stateless functional component:
// Hier wird eine Variable erstellt, weil mit prop-types gearbeitet wird.
// "props" wird mit übergeben, wegen der Variablen "titel"
// In onClick wird statt der ES6 "arrow statements syntax" die "expression syntax" verwendet
// Beispiel mit "arrow statements syntax":
// const PrivateHeader = (props) => {
//     return (
//         <div>
//             <h1>{props.titel}</h1>
//             <button onClick={() => {
//                 Accounts.logout()
//             }}>Abmelden</button>
//         </div>
//     );
// };
// Beispiel mit "expression syntax":
const PrivateHeader = (props) => {
    return (
        <div className="header">
            <div className="header__content">
                <h5 className="header__titel">{props.titel}</h5>
                <button onClick={() => Accounts.logout()} className="button button--link-text">Abmelden</button>
            </div>
        </div>
    );
};

// Damit der Titel obligat ist!
PrivateHeader.propTypes = {
    titel: PropTypes.string.isRequired
};

export default PrivateHeader;