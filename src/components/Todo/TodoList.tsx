import { Button } from "@mui/material";
import { useState } from "react";
import { SettingsBtn } from "../ui/SettingsBtn";
import classes from "./Todo.module.scss";
import { useTodoList } from "./context/TodoContext";
import { TodoCreateOrEdit } from "./modal/TodoCreateOrEdit";
import { TodoItemContainer } from "./TodoItemContainer";

export function TodoList() {
  const [createOpen, setCreateOpen] = useState(false);

  const { todos } = useTodoList();

  const todoContainers = Object.entries(todos).map(([date, todoList]) => (
    <TodoItemContainer key={date} date={date} todos={todoList} />
  ));

  return (
    <div>
      <div className={classes.todo__header}>
        <h1>Todo</h1>
        <div className={classes.todo__header_settings}>
          <Button variant="contained" className="success_btn" onClick={() => setCreateOpen(true)}>
            Add
          </Button>
          {createOpen && (
            <TodoCreateOrEdit open={createOpen} handleClose={() => setCreateOpen(false)} />
          )}
          <SettingsBtn />
        </div>
      </div>
      {todoContainers}
    </div>
  );
}
