import { TodoList } from "./components/Todo";
import { TodoProvider } from "./components/Todo/context/TodoContext";

function App() {
  return (
    <main className="container">
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </main>
  );
}

export default App;
