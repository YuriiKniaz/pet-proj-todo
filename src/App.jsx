import { useEffect, useState } from 'react';
import ListItem from './components/ListItem';
import { nanoid } from 'nanoid';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import app from './App.module.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoname, setTodoName] = useState('');

  const handleNameChange = e => {
    const { value } = e.target;
    setTodoName(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!todoname || todoname.length < 3) {
      return alert('Todo name must be larger');
    }

    const newTodos = [
      ...todos,
      {
        id: nanoid(),
        name: todoname,
        completed: false,
      },
    ];

    setTodos(newTodos);

    setTodoName('');
  };

  const handleRemove = id => {
    const filteredTodo = todos.filter(todo => {
      return todo.id !== id;
    });

    setTodos(filteredTodo);
  };

  const handleDragEnd = e => {
    const { active, over } = e;

    if (active.id !== over.id) {
      setTodos(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        const newItems = [...items];

        newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, items[oldIndex]);

        return newItems;
      });
    }
  };

  const handleCompleted = id => {
    const filteredTodo = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    });

    setTodos(filteredTodo);
  };

  useEffect(() => {
    const todosItem = JSON.parse(localStorage.getItem('userTodos')) ?? [];

    setTodos(todosItem);
  }, []);

  useEffect(() => {
    localStorage.setItem('userTodos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className={app.appWrapper}>
      <form onSubmit={handleSubmit} className={app.form}>
        <h1 className={app.title}>Today's Tasks</h1>
        <div className={app.inputWrapper}>
          <input
            className={app.inputName}
            type="text"
            todoname={todoname}
            onChange={handleNameChange}
            placeholder="Add task"
          />
          <div className={app.btnWrapper}>
            <button className={app.btn} type="submit">
              Add Todo
            </button>
          </div>
        </div>
      </form>

      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={todos.map(todo => todo.id)}>
          {todos.length > 0 ? (
            <ul className={app.list}>
              {todos.map(todo => {
                const { id, name, completed } = todo;
                return (
                  <ListItem
                    key={id}
                    id={id}
                    name={name}
                    completed={completed}
                    handleRemove={handleRemove}
                    handleCompleted={handleCompleted}
                  />
                );
              })}
            </ul>
          ) : (
            <p className={app.empty}>There are no todos yet</p>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App;
