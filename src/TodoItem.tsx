
import { Trash } from "lucide-react";
import type { Todo } from "./types/main";

type Props = {
    todo: Todo,
    onDelete: () => void,
    isSelected: boolean,
    onToggleSelect: (id: number) => void
}


function TodoItem ({todo, isSelected, onToggleSelect, onDelete} : Props) {

    return (
        <li className="p-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        checked={isSelected}
                        onChange={() => onToggleSelect(todo.id)}
                    />
                    <span className="text-md font-bold">
                        <span>{todo.title}</span>
                    </span>
                    <span
                        className={`badge badge-sm badge-soft
                            ${todo.priority === "Urgente"
                                ? "badge-error"
                                : todo.priority === "Moyenne"
                                    ? "badge-warning"
                                    : "badge-success"}`}
                    >
                        {todo.priority}
                    </span>
                </div>
                <button
                    onClick={onDelete}
                    className="btn btn-sm btn-error btn-soft"
                >
                    <Trash className="w-4 h-4" />
                </button>
            </div>
        </li>
    );
}

export default TodoItem;