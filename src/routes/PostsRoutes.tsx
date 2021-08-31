import { Box, LinearProgress } from '@material-ui/core';
import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const PostDetail = React.lazy(() => import('../pages/PostDetail/PostDetail'));
const PostsComponent = React.lazy(() => import('../pages/Posts/Posts'));

function PostsRoutes() {
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
        <Route exact path={path} component={PostsComponent} />
        <Route path={`${path}/:postId`} component={PostDetail} />
      </Suspense>
    </Switch>
  );
}

export default PostsRoutes;
