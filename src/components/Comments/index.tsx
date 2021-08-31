import { Fragment } from 'react';

import { CommentOutlined } from '@material-ui/icons';
import { Typography, Box } from '@material-ui/core';

import { Comments } from '../../types/Comment';
import ListItem from '../ListItem';
import List from '../List';

interface CommentsProps {
  children?: any;
  comments: Comments;
}

function CommentsComponent(props: CommentsProps) {
  const { comments } = props;

  return (
    <Fragment>
      <Typography>{`${comments.length} Comentários`}</Typography>
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index}>
            <Box sx={{ marginX: 1 }}>
              <CommentOutlined />
            </Box>

            <Box sx={{ marginLeft: 2 }}>
              <Typography fontWeight={600}>{comment.name}</Typography>
              <Typography>
                <Typography variant={'caption'} display={'inline-block'} fontWeight={600}>
                  {comment.email}
                </Typography>{' '}
                - {comment.body}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
}

export default CommentsComponent;
