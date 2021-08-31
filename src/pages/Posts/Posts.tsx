import { useEffect, useState, Fragment } from 'react';
import { LibraryBooksOutlined } from '@material-ui/icons';
import { Box, Typography } from '@material-ui/core';
import { useRouteMatch } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import ApiService from '../../api/Api';
import { Posts } from '../../types/Post';
import ListItem from '../../components/ListItem';
import List from '../../components/List';

interface PostsParams {
  userId?: string;
}

export default function PostsComponent() {
  const [posts, setPosts] = useState<Posts>([]);
  const { userId } = useParams<PostsParams>();
  const { url } = useRouteMatch();

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    function getPosts() {
      ApiService.get<Posts>('posts', { params: { userId }, cancelToken: cancelTokenSource.token })
        .then((posts) => {
          setPosts(posts);
        })
        .catch((e) => console.log(e));
    }

    getPosts();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [userId]);

  return (
    <Fragment>
      <List>
        {posts.map((post, index) => (
          <Link key={index} to={`${url}/${post.id}`}>
            <ListItem>
              <LibraryBooksOutlined />
              <Box sx={{ marginLeft: 4 }}>
                <Typography>{post.title}</Typography>
                <Typography fontWeight={600} variant='caption'>
                  Ver postagem
                </Typography>
              </Box>
            </ListItem>
          </Link>
        ))}
      </List>
    </Fragment>
  );
}
