import { Box, LinearProgress } from '@material-ui/core';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const Users = React.lazy(() => import('../pages/Users/Users'));

const HomeComponent = React.lazy(() => import('../pages/Home/Home'));

function HomeRoutes() {
  return (
    <Switch>
      <Suspense
        fallback={
          <Box width='100%'>
            <LinearProgress />
          </Box>
        }
      >
        <Route exact path='/' component={HomeComponent} />
        <Route path='/users/:userId' component={Users} />
      </Suspense>
    </Switch>
  );
}

export default HomeRoutes;
