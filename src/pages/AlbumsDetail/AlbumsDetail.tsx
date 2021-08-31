import { Box, ImageList, ImageListItem, ImageListItemBar, LinearProgress, ListSubheader } from '@material-ui/core';
import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../api/Api';
import useWindowSize from '../../hooks/useWindowSize';
import { Photos } from '../../types/Photo';

function AlbumDetail() {
  const [photos, setPhotos] = useState<Photos>([]);
  const [photoColumns, setPhotoColumns] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { albumId } = useParams<any>();

  const size = useWindowSize();

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    function getPhotos() {
      ApiService.get<Photos>(`albums/${albumId}/photos`, { cancelToken: cancelTokenSource.token })
        .then((photos) => setPhotos(photos))
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));
    }
    getPhotos();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [albumId]);

  useEffect(() => {
    const breakpoints = {
      md: 768,
      lg: 992,
    };

    function getPhotoColumns(width: number = 0) {
      if (width >= breakpoints.lg) {
        return setPhotoColumns(6);
      }

      if (width >= breakpoints.md) {
        return setPhotoColumns(4);
      }

      return setPhotoColumns(1);
    }

    getPhotoColumns(size.width);
  }, [size]);

  if (isLoading) {
    return (
      <Box width='100%'>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Fragment>
      <ListSubheader component='div'>{`${photos.length} Fotos`}</ListSubheader>
      <ImageList  cols={photoColumns}>
        {photos.map((photo) => (
          <ImageListItem sx={{minWidth:'150px', minHeight:'150px'}} key={photo.thumbnailUrl}>
            <img
              src={photo.thumbnailUrl}
              srcSet={photo.thumbnailUrl}
              alt={photo.title}
              loading='lazy'
            />
            <ImageListItemBar title={photo.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </Fragment>
  );
}

export default AlbumDetail;
