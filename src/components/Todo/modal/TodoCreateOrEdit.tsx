/* eslint-disable consistent-return */
import { Button, Modal, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";
import { ITodo, useTodoList } from "../context/TodoContext";
import classes from "../Todo.module.scss";
import { TodoDelete } from "./TodoDelete";

interface Props {
  open: boolean;
  isEdit?: boolean;
  todo?: ITodo;
  todoDate?: string;
  handleClose?: () => void;
}

const idGenerator = () => {
  let id = 1000;
  return () => id++;
};

const colors = ["#FF0000", "#366EFF", "#FFEB33", "#10C200", "#991DE1", "#D600E1"];
const initialTodo: ITodo = {
  id: 0,
  title: "",
  description: "",
  done: false,
  color: "#FF0000",
};

const setId = idGenerator();

export function TodoCreateOrEdit({ isEdit, todo, todoDate, open, handleClose }: Props) {
  const [newTodo, setNewTodo] = useState<ITodo>(isEdit && todo ? todo : initialTodo);
  const [fieldError, setFieldError] = useState<Pick<ITodo, "title" | "description">>({
    title: "",
    description: "",
  });
  const [date, setDate] = useState<Date | null>(
    isEdit && todoDate ? dayjs(todoDate, "DD/MM/YYYY").toDate() : new Date(),
  );
  const [openDelete, setOpenDelete] = useState(false);

  const { addTodo, editTodo } = useTodoList();

  const handleChangeNewTodo = (
    prop: keyof Pick<ITodo, "title" | "description" | "color">,
    value: string,
  ) => {
    setNewTodo({ ...newTodo, [prop]: value });
  };

  const handleSubmit = () => {
    if (!newTodo.title) {
      return setFieldError({ title: "Task title is required" });
    }
    if (isEdit && todoDate) {
      editTodo(dayjs(date).format("DD/MM/YYYY"), newTodo, todoDate);
      return handleClose?.();
    }
    if (date) {
      addTodo(dayjs(date).format("DD/MM/YYYY"), { ...newTodo, id: setId() });
      return handleClose?.();
    }
  };

  const colorElements = colors.map((col, i) => (
    <div
      key={i}
      className={col === newTodo.color ? classes.todo__create_color__active : ""}
      aria-hidden
      onClick={() => handleChangeNewTodo("color", col)}
      style={{ background: col }}
    />
  ));

  return (
    <>
      <TodoDelete
        open={openDelete}
        date={todoDate as string}
        todoTitle={todo?.title as string}
        todoId={todo?.id as number}
        handleClose={() => setOpenDelete(false)}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={`modal container ${classes.todo__create}`}>
          <div className={classes.todo__create_title}>
            <h2>{isEdit ? "Edit todo" : "Create todo"}</h2>
            {isEdit && (
              <Button
                variant="contained"
                className="cancel_btn"
                onClick={() => setOpenDelete(true)}
              >
                Delete
              </Button>
            )}
          </div>
          <TextField
            id="outlined-basic"
            required
            label="Title"
            variant="filled"
            className="field"
            error={Boolean(fieldError.title)}
            helperText={fieldError.title}
            value={newTodo.title}
            onBlur={() => setFieldError({ ...fieldError, title: "" })}
            onChange={(e) => handleChangeNewTodo("title", e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="filled"
            className="field"
            multiline
            value={newTodo.description}
            onChange={(e) => handleChangeNewTodo("description", e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              inputFormat="DD/MM/YYYY"
              className="field"
              value={date}
              minDate={new Date()}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField variant="filled" {...params} />}
            />
          </LocalizationProvider>
          <div className={classes.todo__create_colors}>{colorElements}</div>

          <div className={classes.todo__create_btns}>
            <Button variant="contained" className="success_btn" onClick={() => handleSubmit()}>
              {isEdit ? "Edit" : "Create"}
            </Button>
            <Button variant="contained" className="cancel_btn" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
