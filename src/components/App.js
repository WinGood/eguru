import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import { IndexPage } from './pages/IndexPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

const renderIndex = () => <IndexPage />;
const renderAbout = () => <AboutPage />;
const renderAthlete = ({ match, staticContext }) => {
  const id = match.params.id;
  if (!athlete) {
    return <NotFoundPage staticContext={staticContext} />;
  }
};

export const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" render={renderIndex} />
      <Route exact path="/about" render={renderAbout} />
      <Route exact path="/athlete/:id" render={renderAthlete} />
      <Route component={NotFoundPage} />
    </Switch>
  </Layout>
);

export default App;
