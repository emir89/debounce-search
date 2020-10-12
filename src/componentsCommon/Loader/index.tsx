import React from 'react';
import appStyles from '../../containers/App/app.module.scss'

const Loader: () => JSX.Element = () => {
    return (
        <div className={appStyles.Loading}>
            <h3>Loading...</h3>
        </div>
    );
}

export default Loader;