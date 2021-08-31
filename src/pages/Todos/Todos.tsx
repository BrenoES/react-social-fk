import { useState, useEffect, Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { Close, Done } from '@material-ui/icons';
import { useParams } from 'react-router';
import axios from 'axios';

import ApiService from '../../api/Api';

import { Todos, Todo } from '../../types/Todo';
import ListItem from '../../components/ListItem';
import List from '../../components/List';

interface TodoProps {
  children?: React.ReactNode;
  todo?: Todo;
}

const StatusIcon = ({ todo }: TodoProps) => {
  return todo?.completed ? <Done /> : <Close />;
};

function TodosComponent() {
  const [todos, setTodos] = useState<Todos>([]);
  const { userId } = useParams<any>();

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    function getTodos() {
      ApiService.get<Todos>('todos', { params: { userId }, cancelToken: cancelTokenSource.token })
        .then((todos) => {
          setTodos(todos);
        })
        .catch((e) => console.log(e));
    }

    getTodos();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [userId]);

  return (
    <Fragment>
      <List>
        {todos.map((todo, index) => (
          <ListItem key={index}>
            <StatusIcon key={index} todo={todo} />
            <Typography style={{ marginLeft: 8 }}>{todo.title}</Typography>
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
}

export default TodosComponent;
