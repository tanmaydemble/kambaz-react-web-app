import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    return (
        <div className="Container ">
            <div className="card" style={{ width: '400px' }}>
                <h2>Todo List</h2>
                <ul className="list-group">
                    <TodoForm />
                    {todos.map((todo: { id: string; title: string }) => (
                        <TodoItem todo={todo} />
                    ))}
                </ul>
            </div>
            <hr />
        </div>
    );
}
