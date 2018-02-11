import React from 'react';
import { Link } from 'react-router-dom';

// export default class NotFound extends React.Component {
//     render() {
//         return <p>NotFound component here</p>;
//     }
// }
// Das Gleiche als stateless functional component: schneller und einfacher!
export default () => {
    return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>Seite nicht gefunden</h1>
                <p>Hmmm, Seite wurde nicht gefunden!</p>
                <Link to="/" className="button button--link">Startseite</Link>
            </div>
        </div>
    );
};