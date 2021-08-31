import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const TodosComponent = React.lazy(() => import('../pages/Todos/Todos'));

function TodosRoutes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense fallback={<span>Loading...</span>}>
        <Route exact path={path} component={TodosComponent} />
      </Suspense>
    </Switch>
  );
}

export default TodosRoutes;
