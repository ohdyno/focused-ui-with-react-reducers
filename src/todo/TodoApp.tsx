import {FormEvent, PropsWithChildren, useContext, useEffect, useState} from "react";
import {TodoItem, TodoState, TodoStatus} from "./logic/reducer.ts";
import {NewTodoAction, ToggleTodoStatusAction} from "./logic/actions.ts";
import {LoadTodosThunk} from "./logic/thunks.ts";
import {DispatchContext, StateContext} from "./logic/context.ts";

function TodoList({todos}: TodoState) {
    const dispatch = useContext(DispatchContext)

    function handleOnChange(todo: TodoItem) {
        dispatch(ToggleTodoStatusAction(todo))
    }

    return (
        <ul>
            {todos.map((todo) => {
                const id = todo.title
                    .replace(/\s+/g, '-')
                    .toLowerCase()
                return (
                    <li key={id}>
                        <label>
                            {todo.title}
                            <input type={"checkbox"}
                                   checked={todo.status === TodoStatus.Complete}
                                   onChange={() => handleOnChange(todo)}/>
                        </label>
                    </li>
                )
            })}
        </ul>
    )
}

export function TodoApp() {
    const state = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    useEffect(() => {
        dispatch(LoadTodosThunk)
    }, [dispatch])

    if (state.todos.length > 0) {
        return (
            <Todo>
                <TodoList todos={state.todos}/>
            </Todo>
        )
    }

    return (
        <Todo>
            <section data-testid={"todo-list"}>
                <h1>All Done!</h1>
            </section>
        </Todo>
    );
}

function Todo({children}: PropsWithChildren) {
    const dispatch = useContext(DispatchContext);
    const [todo, setTodo] = useState('')

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(NewTodoAction(todo))
        setTodo('')
    }

    return (
        <section>
            <form method={'post'} onSubmit={handleOnSubmit}>
                <label>Add New Todo:
                    <input type={"text"} placeholder={"New Todo"} value={todo}
                           onChange={(event) => setTodo(event.target.value)}/>
                </label>
            </form>
            <section>
                {children}
            </section>
        </section>
    )
}
