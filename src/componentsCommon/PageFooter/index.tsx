import React from "react";
import styles from './pageFooter.module.scss'

const PageFooter: React.FC = () => {
    return (
        <div className={styles.PageFooter}>
            Performance Technologies Test - {new Date().getFullYear()}
        </div>
    );
}

export default PageFooter;