import { useState } from "react";
import { SwitchBtn } from "../ui/SwitchBtn";
import classes from "./Todo.module.scss";
import { ITodo, useTodoList } from "./context/TodoContext";
import { TodoCreateOrEdit } from "./modal/TodoCreateOrEdit";

interface Props extends ITodo {
  date: string;
}

export function TodoItem({ id, title, description, done, color, date }: Props) {
  const [openEdit, setOpenEdit] = useState(false);

  const { toggleTodoDone } = useTodoList();
  return (
    <div className={classes.todo__item}>
      <div aria-hidden className={classes.todo__item_title} onClick={() => setOpenEdit(true)}>
        <h4 aria-hidden style={{ textDecoration: done ? "line-through" : "none" }}>
          {title}
        </h4>
        <p>{description}</p>
        <div className={classes.todo__color_border} style={{ background: color }} />
      </div>
      <SwitchBtn checked={done} onChange={() => toggleTodoDone(date, id)} />
      <TodoCreateOrEdit
        isEdit
        open={openEdit}
        todoDate={date}
        todo={{ id, title, description, done, color }}
        handleClose={() => setOpenEdit(false)}
      />
    </div>
  );
}
