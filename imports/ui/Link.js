import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

// export default class Link extends React.Component {
//     render() {
//         return (
//             <div>
//                 <PrivateHeader titel="Deine Links"/>
//                 <LinksList />
//                 <AddLink/>
//             </div>
//         );
//     }
// }
// Das Gleiche als stateless functional component:
export default () => {
    return (
        <div>
            <PrivateHeader titel="Deine Links"/>
            <div className="page-content">
                <LinksListFilters/>
                <AddLink/>
                <LinksList/>
            </div>
        </div>
    );
};
