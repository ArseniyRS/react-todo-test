/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TODAY, TOMORROW, YESTERDAY } from "../../constants";

export const initialTodo = {
  [YESTERDAY]: [
    {
      id: 1,
      title: "Visit David",
      description: "Lorem Ipsum Dolor Sit met...",
      color: "#FF0000",
      done: false,
    },
  ],
  [TODAY]: [
    {
      id: 1,
      title: "Visit David",
      description: "Lorem Ipsum Dolor Sit met...",
      color: "#FF0000",
      done: false,
    },
    {
      id: 2,
      title: "Goceries For Dinner",
      description: "Lorem Ipsum Dolor Sit met...",
      color: "#366EFF",
      done: false,
    },
    {
      id: 3,
      title: "Fix Dad’s iPad",
      description: "Lorem Ipsum Dolor Sit met...",
      color: "#FFEB33",
      done: true,
    },
  ],
  [TOMORROW]: [
    {
      id: 1,
      title: "Visit David",
      description: "Lorem Ipsum Dolor Sit met...",
      color: "#FF0000",
      done: false,
    },
  ],
};

export interface ITodo {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  color: string;
}

interface ITodoByDate {
  [x: string]: ITodo[];
}

interface ITodoContext {
  todos: ITodoByDate;
  deleteTodo: (date: string, todoId: number) => void;
  editTodo: (date: string, newTodo: ITodo, beforeDate: string) => void;
  toggleTodoDone: (date: string, todoId: number) => void;
  addTodo: (date: string, newTodo: ITodo) => void;
}

const addTodoByDate = (todos: ITodoByDate, date: string, newTodo: ITodo) => {
  const listClone = { ...todos };
  if (listClone[date]) {
    listClone[date].push(newTodo);
  } else {
    listClone[date] = [newTodo];
  }
  return listClone;
};

const deleteTodoByDate = (todos: ITodoByDate, date: string, todoId: number) => ({
  ...todos,
  [date]: todos[date].filter((todo) => todo.id !== todoId),
});

const TodoContext = createContext<ITodoContext | null>(null);

export function TodoProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<ITodoByDate>(initialTodo);

  const addTodo = (date: string, newTodo: ITodo) => {
    setTodos(addTodoByDate(todos, date, newTodo));
  };

  const deleteTodo = (date: string, todoId: number) => {
    setTodos(deleteTodoByDate(todos, date, todoId));
  };

  const toggleTodoDone = (date: string, todoId: number) => {
    const listClone = { ...todos };
    listClone[date].map((todo) => {
      if (todo.id === todoId) {
        todo.done = !todo.done;
      }
      return todo;
    });
    setTodos(listClone);
  };

  const editTodo = (date: string, newTodo: ITodo, beforeDate: string) => {
    if (date !== beforeDate) {
      const deletedTodo = deleteTodoByDate(todos, beforeDate, newTodo.id);
      const editedAndMovedTodo = addTodoByDate(deletedTodo, date, newTodo);
      return setTodos(editedAndMovedTodo);
    }
    const editedTodo = todos[date].map((todo) => {
      if (todo.id === newTodo.id) {
        return { ...todo, ...newTodo };
      }
      return todo;
    });
    return setTodos({
      ...todos,
      [date]: editedTodo,
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        deleteTodo,
        editTodo,
        toggleTodoDone,
        addTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoList = () => {
  const context = useContext(TodoContext);
  if (context === null) {
    throw new Error("cant use useTodoList outside from TodoProvider");
  }
  return context;
};
