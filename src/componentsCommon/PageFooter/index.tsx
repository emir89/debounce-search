import React from "react";
import styles from "./pageFooter.module.scss";

const PageFooter: React.FC = () => {
  return (
    <div className={styles.PageFooter}>
      Debounce Search Demo - {new Date().getFullYear()}
    </div>
  );
};

export default PageFooter;
