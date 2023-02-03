import { NewsProvider } from "./components/News/context/NewsContext";
import { TodoList } from "./components/Todo";
import { TodoProvider } from "./components/Todo/context/TodoContext";

function App() {
  return (
    <main className="container">
      <TodoProvider>
        <NewsProvider>
          <TodoList />
        </NewsProvider>
      </TodoProvider>
    </main>
  );
}

export default App;
