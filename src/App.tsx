import { Construction } from "lucide-react";
import { useState } from "react";
import TodoItem from "./TodoItem";
import type { Todo, Priority } from "./types/main";

function App() {
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Moyenne");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Priority | null>(null);
  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());


  const countAllTodo = todos.length;
  const countUrgentTodo = todos.filter((todo) => todo.priority === "Urgente").length;
  const countMoyenneTodo = todos.filter((todo) => todo.priority === "Moyenne").length;
  const countBasseTodo = todos.filter((todo) => todo.priority === "Basse").length;

  let filteredTodos = todos;
  if (filter) {
    filteredTodos = todos.filter((todo) => todo.priority === filter);
  }

  function addTodo() {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      title: input.trim(),
      priority,
    };

    const updatedTodos = [newTodo, ...todos];

    setTodos(updatedTodos);
    setInput("");
    setPriority("Moyenne");
  }


  function toggleSelectTodo(id: number) {
    const newSelected = new Set(selectedTodos);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTodos(newSelected);
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
    setSelectedTodos((selectedTodos) => {
      const newSelected = new Set(selectedTodos);
      newSelected.delete(id);
      return newSelected;
    });
  }

  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
        <div className="flex gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Ajouter une tâche..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            className="select w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button className="btn btn-primary" onClick={addTodo}>
            Ajouter
          </button>
        </div>
        <div className="space-y-2 flex-1 h-fit">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <button className={`btn btn-soft ${filter === null ? 'btn-primary' : ''} `} onClick={() => setFilter(null)}>Tous ({countAllTodo})</button>
              <button className={`btn btn-soft ${filter === "Urgente" ? 'btn-primary' : ''} `} onClick={() => setFilter('Urgente' as Priority)}>Urgente ({countUrgentTodo})</button>
              <button className={`btn btn-soft ${filter === "Moyenne" ? 'btn-primary' : ''} `} onClick={() => setFilter('Moyenne' as Priority)}>Moyenne ({countMoyenneTodo})</button>
              <button className={`btn btn-soft ${filter === "Basse" ? 'btn-primary' : ''} `} onClick={() => setFilter('Basse' as Priority)}>Basse ({countBasseTodo})</button>
            </div>
            <button className="btn btn-primary">Finir la sélection ({selectedTodos.size})</button>
          </div>

          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem
                    todo={todo}
                    isSelected={selectedTodos.has(todo.id)}
                    onDelete={() => deleteTodo(todo.id)}
                    onToggleSelect={toggleSelectTodo}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center flex-col p-5">
              <div>
                <Construction
                  strokeWidth={1}
                  className="w-40 h-40 text-primary"
                />
              </div>
              <p className="text-sm">Aucune tâche pour ce filtre</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
