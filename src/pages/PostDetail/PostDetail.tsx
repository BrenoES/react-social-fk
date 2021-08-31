import { Fragment, useEffect, useState } from 'react';
import { Typography, Box, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router';

import { Post } from '../../types/Post';
import { Comments } from '../../types/Comment';

import ApiService from '../../api/Api';

import CommentsComponent from '../../components/Comments';

function PostDetail() {
  const [post, setPost] = useState<Post>({} as Post);
  const [comments, setComments] = useState<Comments>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { postId } = useParams<any>();

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    function getPost() {
      ApiService.get<Post>(`posts/${postId}`, { cancelToken: cancelTokenSource.token })
        .then((post) => {
          setPost(post);
        })
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));
    }

    function getCommentsPost() {
      ApiService.get<Comments>(`posts/${postId}/comments`, { cancelToken: cancelTokenSource.token })
        .then((comments) => {
          setComments(comments);
        })
        .catch((e) => console.log(e));
    }

    getPost();
    getCommentsPost();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [postId]);

  if (isLoading) {
    return (
      <Box width='100%'>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Fragment>
      <Box sx={{ margin: 4 }}>
        <Typography variant={'h6'} fontWeight={600} marginY={2}>
          {post.title}
        </Typography>
        <Typography>{post.body}</Typography>
      </Box>
      <Box sx={{ marginX: 4 }}>
        <CommentsComponent comments={comments} />
      </Box>
    </Fragment>
  );
}

export default PostDetail;
