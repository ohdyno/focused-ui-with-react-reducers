import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {TodoApp} from "../../src/todo/TodoApp";
import {TodoStatus} from "../../src/todo/TodoReducer";
import {NewTodoAction, ToggleTodoStatusAction} from "../../src/todo/TodoActions";
import {LoadTodosThunk} from "../../src/todo/TodoThunks";
import {Store} from "../../src/todo/TodoStoreComponent";

describe('Todo', () => {
    describe('Rendering', () => {
        describe('No (Zero) Todos', () => {
            it('renders "All done!"', () => {
                const {container} = render(
                    <Store state={{todos: []}}>
                        <TodoApp/>
                    </Store>
                );

                expect(container).toMatchSnapshot()
            });
        })

        describe('Have Todos', () => {
            it('renders the todo title and status', () => {
                const {container} = render(
                    <Store state={{
                        todos: [
                            {
                                id: "0",
                                title: "mow the lawn",
                                status: TodoStatus.Complete
                            },
                            {
                                id: "1",
                                title: "feed the dog",
                                status: TodoStatus.Incomplete
                            }
                        ]
                    }
                    }>
                        <TodoApp/>
                    </Store>
                );

                expect(container).toMatchSnapshot()
            });
        })
    })

    describe('Handling user interactions', () => {
        describe('Adding a new todo', () => {
            it('dispatches a "new todo" action', async () => {
                const user = userEvent.setup()
                const dispatch = vi.fn()
                render(
                    <Store dispatch={dispatch}>
                        <TodoApp/>
                    </Store>
                );

                const input = screen.getByLabelText(/add new todo/i);
                await user.type(input, "cook food{enter}")

                expect(dispatch).toHaveBeenCalledWith(NewTodoAction("cook food"))
            });

            it('allows inputting multiple todos without deleting previous ', async () => {
                const user = userEvent.setup()
                const dispatch = vi.fn()
                render(
                    <Store dispatch={dispatch}>
                        <TodoApp/>
                    </Store>
                );

                const input = screen.getByLabelText(/add new todo/i);
                await user.type(input, "cook food{enter}")
                expect(dispatch).toHaveBeenCalledWith(NewTodoAction("cook food"))

                await user.type(input, "take out garbage{enter}")
                expect(dispatch).toHaveBeenCalledWith(NewTodoAction("take out garbage"))
            });
        })

        describe('Changing todo status', () => {
            const todo = {
                id: "0",
                title: "feed the dog",
                status: TodoStatus.Incomplete
            };

            it('dispatches a "toggle todo status" action when a todo status checkbox is checked/unchecked', async () => {
                const user = userEvent.setup()
                const dispatch = vi.fn()
                render(
                    <Store state={{todos: [todo]}}
                           dispatch={dispatch}>
                        <TodoApp/>
                    </Store>
                );

                const checkBox = screen.getByLabelText(new RegExp(todo.title, "i"));
                await user.click(checkBox)

                expect(dispatch).toHaveBeenCalledWith(ToggleTodoStatusAction(todo))
            });
        })
    })

    describe('Loading todos on initial render', () => {
        it('dispatches the "load todos" thunk', () => {
            const dispatch = vi.fn()
            render(
                <Store dispatch={dispatch}>
                    <TodoApp/>
                </Store>
            );
            expect(dispatch).toHaveBeenCalledWith(LoadTodosThunk)
        })
    })
});
