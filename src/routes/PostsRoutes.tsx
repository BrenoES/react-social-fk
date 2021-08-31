import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const PostDetail = React.lazy(() => import('../pages/PostDetail/PostDetail'));
const PostsComponent = React.lazy(() => import('../pages/Posts/Posts'));

function PostsRoutes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense fallback={<span>Loading...</span>}>
        <Route exact path={path} component={PostsComponent} />
        <Route path={`${path}/:postId`} component={PostDetail} />
      </Suspense>
    </Switch>
  );
}

export default PostsRoutes;
