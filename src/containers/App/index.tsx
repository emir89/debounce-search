import React, { lazy } from "react";
import PageFooter from "../../componentsCommon/PageFooter";
import appStyles from "./app.module.scss";

const ProductsPage = lazy(() => import("../ProductsPage"));

const App: () => JSX.Element = () => {
  return (
    <>
      <div className={appStyles.MainContent}>
        <ProductsPage />
      </div>
      <PageFooter />
    </>
  );
};

export default App;
