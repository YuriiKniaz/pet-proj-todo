import React from 'react';
import list from './ListItem.module.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ListItem = ({ id, name, completed, handleRemove, handleCompleted }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        className={list.dragWrapper}
        style={style}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
      >
        <li
          className={`${list.listItem} ${
            completed ? list.active : list.unactive
          } `}
        >
          <div className={list.taskWrapper}>
            <p className={list.title}>{name}</p>
          </div>
          <div className={list.btnWrapper}>
            <button
              className={list.btnCompleted}
              type="button"
              onDoubleClick={() => handleCompleted(id)}
            >
              &#10003;
            </button>
            <button
              className={list.btnRemove}
              type="button"
              onDoubleClick={() => handleRemove(id)}
            >
              X
            </button>
          </div>
        </li>
      </div>
    </>
  );
};

export default ListItem;
