import { useEffect, useState, Fragment, ChangeEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Input, InputAdornment, ListSubheader, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import Api from '../../api/Api';
import { Users, User } from '../../types/User';
import UserPng from '../../assets/default.png';

import ListEmpty from '../../components/ListEmpty';
import InputBox from '../../components/InputBox';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import ListItemImage from '../../components/ListItemImage';
import ListItemDetail from '../../components/ListItemDetail';

const inputSearch = {
  width: '60%',
};

export default function Home() {
  const [users, setUsers] = useState<Users>([]);
  const [filteredUsers, setFilteredUsers] = useState<Users>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.toLowerCase();
    let result = [];

    result = users.filter((user) => {
      return user.name.toLocaleLowerCase().includes(value);
    });
    setFilteredUsers(result);
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    function getUsers() {
      Api.get<User[]>('users', { cancelToken: cancelTokenSource.token })
        .then((users) => {
          setUsers(users);
          setFilteredUsers(users);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }

    getUsers();

    return () => {
      cancelTokenSource.cancel();
    };
  }, []);

  return (
    <Fragment>
      <InputBox>
        <Input
          sx={inputSearch}
          id='input-search'
          placeholder='Pesquisar contato'
          onChange={handleSearch}
          startAdornment={
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          }
        />
      </InputBox>
      {!isLoading && (
        <List>
          <ListSubheader sx={{ backgroundColor: 'transparent' }} component='div'>
            {filteredUsers.length} Contatos
          </ListSubheader>
          {filteredUsers.length === 0 ? (
            <ListEmpty message='Ops! Contato pesquisado não foi encontrado' />
          ) : (
            filteredUsers.map((user) => (
              <Link key={user.id} to={`/users/${user.id}/albums`}>
                <ListItem>
                  <ListItemImage src={UserPng} />
                  <ListItemDetail>
                    <Typography>{user.name}</Typography>
                    <Typography>{user.email}</Typography>
                  </ListItemDetail>
                </ListItem>
              </Link>
            ))
          )}
        </List>
      )}
    </Fragment>
  );
}
