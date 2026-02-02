import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo';

type Props = {
  todos: Todo[];
  toggleStatus: (value: number) => void;
  deleteTodo: (value: number) => void;
  pendingList: number[];
  renameTodo: (id: number, value: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleStatus,
  deleteTodo,
  pendingList,
  renameTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          toggleStatus={toggleStatus}
          deleteTodo={deleteTodo}
          pendingList={pendingList}
          renameTodo={renameTodo}
        />
      ))}
    </section>
  );
};
