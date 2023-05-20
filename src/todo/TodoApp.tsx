import {FormEvent, PropsWithChildren, useEffect, useState} from "react";
import {useDispatch, useStoreState} from "./store/TodoStore.ts";
import {TodoItem, TodoState, TodoStatus} from "./store/TodoReducer.ts";
import {NewTodoAction, ToggleTodoStatusAction} from "./store/TodoActions.ts";
import {LoadTodosThunk} from "./store/TodoThunks.ts";

function TodoList({todos}: TodoState) {
    const dispatch = useDispatch()

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
    const state = useStoreState()
    const dispatch = useDispatch()

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
    const dispatch = useDispatch();
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
