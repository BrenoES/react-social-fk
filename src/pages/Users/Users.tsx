import { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';

import { useParams, useRouteMatch } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { User } from '../../types/User';
import ApiService from '../../api/Api';

import AlbumsRoutes from '../../routes/AlbumsRoutes';
import PostsRoutes from '../../routes/PostsRoutes';
import TodosRoutes from '../../routes/TodosRoutes';
import userPng from './../../assets/default.png';
import AvatarImage from '../../components/AvatarImage';
import AvatarDetail from '../../components/AvatarDetail';
import Avatar from '../../components/Avatar';

function allProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface UserParams {
  userId: string;
}

export default function Users() {
  const { path, url } = useRouteMatch();
  const { userId } = useParams<UserParams>();
  const [value, setValue] = useState(`albums`);
  const [user, setUser] = useState<User>({} as User);

  const allTabs = ['albums', 'posts', 'todos'];

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    function getUser() {
      ApiService.get<User>(`users/${userId}`, { cancelToken: cancelTokenSource.token })
        .then((user) => setUser(user))
        .catch((e) => {
          if (!axios.isCancel(e)) {
            console.log(e);
          }
        });
    }

    getUser();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [user, userId]);

  return (
    <Box sx={{ width: '100%' }}>
      <Avatar>
        <AvatarImage src={userPng} />
        <AvatarDetail>
          <Typography>{user.name}</Typography>
          <Typography>{user.email}</Typography>
        </AvatarDetail>
      </Avatar>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='Álbuns' value={allTabs[0]} {...allProps(0)} component={Link} to={`${url}/${allTabs[0]}`} />
          <Tab label='Postagens' value={allTabs[1]} {...allProps(1)} component={Link} to={`${url}/${allTabs[1]}`} />
          <Tab label='Todos' value={allTabs[2]} {...allProps(2)} component={Link} to={`${url}/${allTabs[2]}`} />
        </Tabs>
      </Box>
      <Switch>
        <Route path={`${path}/${allTabs[0]}`} children={() => <AlbumsRoutes />} />
        <Route path={`${path}/${allTabs[1]}`} children={() => <PostsRoutes />} />
        <Route path={`${path}/${allTabs[2]}`} children={() => <TodosRoutes />} />
      </Switch>
    </Box>
  );
}
