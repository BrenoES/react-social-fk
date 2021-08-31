import { Box, LinearProgress } from '@material-ui/core';
import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

const AlbumsComponent = React.lazy(() => import('../pages/Albums/Albums'));
const AlbumDetail = React.lazy(() => import('../pages/AlbumsDetail/AlbumsDetail'));

function AlbumsRoutes() {
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
        <Route exact path={path} component={AlbumsComponent} />
        <Route path={`${path}/:albumId`} component={AlbumDetail} />
      </Suspense>
    </Switch>
  );
}

export default AlbumsRoutes;
