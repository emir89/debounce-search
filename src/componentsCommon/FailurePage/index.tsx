import React from "react";
import appStyles from '../../containers/App/app.module.scss';

const FailurePage: React.FC = () => {
    return (
        <div className={appStyles.FailurePage}>
            <h1>
                Something went wrong. Please try again or contact the support.
            </h1>
        </div>
    );
}

export default FailurePage;