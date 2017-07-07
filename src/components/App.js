import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import { IndexPage } from './pages/IndexPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

const renderDetailPage = ({ match, staticContext }) => {
  const id = match.params.id;
  return <NotFoundPage staticContext={staticContext} />;
};

export const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/contact" component={ContactPage} />
      <Route exact path="/detail/:id" render={renderDetailPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Layout>
);

export default App;
