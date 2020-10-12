import React, {Suspense, lazy} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import PageFooter from "../../componentsCommon/PageFooter";
import Loader from "../../componentsCommon/Loader";
import {createBrowserHistory} from 'history';
import appStyles from './app.module.scss';

const ProductsPage = lazy(() => import('../ProductsPage'));

const App: () => JSX.Element = () => {
  return (
      <Router history={createBrowserHistory() as any}>
        <div className={appStyles.MainContent}>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/" component={ProductsPage} />
            </Switch>
          </Suspense>
        </div>
        <PageFooter />
      </Router>
  );
}

export default App;