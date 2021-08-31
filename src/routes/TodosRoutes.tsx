import { Box, LinearProgress } from '@material-ui/core';
import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const TodosComponent = React.lazy(() => import('../pages/Todos/Todos'));

function TodosRoutes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <Box width='100%'>
            <LinearProgress />
          </Box>
        }
      >
        <Route exact path={path} component={TodosComponent} />
      </Suspense>
    </Switch>
  );
}

export default TodosRoutes;
