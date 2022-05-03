import React from 'react';
import styles from './noResults.module.scss';

const NoResults: () => JSX.Element = () => {
    return (
        <div>
            <img src={require('../../assets/no-results.png')} alt='No results img' className={styles.NoResultsImg} />
            <h3 className={styles.NoResults}>No results.</h3>
        </div>
    );
}

export default NoResults;