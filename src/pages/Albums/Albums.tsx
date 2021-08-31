import { Fragment, useEffect, useState } from 'react';
import ApiService from '../../api/Api';
import { Albums } from '../../types/Album';
import { Todos } from '../../types/Todo';
import { PhotoLibraryOutlined } from '@material-ui/icons';
import { Box, Typography } from '@material-ui/core';
import { useRouteMatch, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ListItem from '../../components/ListItem';
import List from '../../components/List';

interface UserParams {
  userId?: string;
}

function AlbumsComponent() {
  const [albums, setAlbums] = useState<Albums>([]);
  const { url } = useRouteMatch();
  const { userId } = useParams<UserParams>();

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    function getAlbums() {
      ApiService.get<Todos>('albums', { params: { userId }, cancelToken: cancelTokenSource.token })
        .then((albums) => {
          setAlbums(albums);
        })
        .catch((e) => console.log(e));
    }

    getAlbums();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [userId, url]);

  return (
    <Fragment>
      <List>
        {albums.map((album, index) => (
          <Link key={index} to={`${url}/${album.id}`}>
            <ListItem>
              <PhotoLibraryOutlined />
              <Box sx={{ marginLeft: 4 }}>
                <Typography>{album.title}</Typography>
                <Typography fontWeight={600} variant='caption'>
                  Ver álbum
                </Typography>
              </Box>
            </ListItem>
          </Link>
        ))}
      </List>
    </Fragment>
  );
}

export default AlbumsComponent;
