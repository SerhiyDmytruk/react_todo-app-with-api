/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useState } from 'react';
import type { FormEvent } from 'react';

type Props = {
  todo: Todo;
  toggleStatus: (value: number) => void;
  deleteTodo: (value: number) => void;
  pendingList: number[];
  renameTodo: (id: number, value: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleStatus,
  deleteTodo,
  pendingList,
  renameTodo,
}) => {
  const { id, title, completed } = todo;

  const buttonHandler = (todoId: number) => {
    deleteTodo(todoId);
  };

  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(title);

  const formHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.trim() === title) {
      setEditMode(false);
    }

    renameTodo(id, value);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames({
        todo: true,
        completed: completed,
      })}
      data-id={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {
            toggleStatus(id);
          }}
        />
      </label>

      {editMode ? (
        <form onSubmit={formHandler}>
          <input
            type="text"
            data-cy="TodoTitleField"
            defaultValue={title}
            placeholder="Empty todo will be deleted"
            className={classNames({
              'todo__title-field': true,
            })}
            autoFocus
            onBlur={() => {
              setEditMode(false);
            }}
            onChange={event => {
              setValue(event.target.value);
            }}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                setEditMode(false);
              }
            }}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setEditMode(true);
            }}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              buttonHandler(id);
            }}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames({
          'modal overlay': true,
          'is-active': pendingList.includes(id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
