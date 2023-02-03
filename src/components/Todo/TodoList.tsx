import { Button } from "@mui/material";
import { useState } from "react";
import { SettingsBtn } from "../ui/SettingsBtn";
import classes from "./Todo.module.scss";
import { useTodoList } from "./context/TodoContext";
import { TodoCreateOrEdit } from "./modal/TodoCreateOrEdit";
import { TodoItemContainer } from "./TodoItemContainer";
import { FooterNews } from "../News/FooterNews";
import { TodoSettings } from "./modal/TodoSettings";

export function TodoList() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [showNews, setShowNews] = useState(false);

  const { todos } = useTodoList();

  const todoContainers = Object.entries(todos).map(([date, todoList]) => (
    <TodoItemContainer key={date} date={date} todos={todoList} />
  ));

  return (
    <div className={classes.todo__wrapper}>
      <div className={classes.todo__container}>
        <div className={classes.todo__header}>
          <h1>Todo</h1>
          <div className={classes.todo__header_settings}>
            <Button variant="contained" className="success_btn" onClick={() => setOpenCreate(true)}>
              Add
            </Button>
            {openCreate && (
              <TodoCreateOrEdit open={openCreate} handleClose={() => setOpenCreate(false)} />
            )}
            <SettingsBtn onClick={() => setOpenSettings(true)} />
            <TodoSettings
              open={openSettings}
              handleClose={() => setOpenSettings(false)}
              settings={showNews}
              setSettings={() => setShowNews(!showNews)}
            />
          </div>
        </div>
        {todoContainers}
      </div>
      {showNews && <FooterNews />}
    </div>
  );
}
