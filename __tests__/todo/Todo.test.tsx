import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {TodoApp, StateContext, DispatchContext} from "../../src/todo/TodoApp";
import {TodoStatus} from "../../src/todo/logic/reducer";
import {NewTodoAction, ToggleTodoStatusAction} from "../../src/todo/logic/actions";
import {LoadTodosThunk} from "../../src/todo/logic/thunks";

describe('Todo', () => {
    describe('Rendering', () => {
        describe('No (Zero) Todos', () => {
            it('renders "All done!"', () => {
                const state = {todos: []};
                const dispatch = vi.fn();

                const {container} = render(
                    <StateContext.Provider value={state}>
                        <DispatchContext.Provider value={dispatch}>
                            <TodoApp/>
                        </DispatchContext.Provider>
                    </StateContext.Provider>
                );

                expect(container).toMatchSnapshot()
            });
        })

        describe('Have Todos', () => {
            it('renders the todo title and status', () => {
                const state = {
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
                };
                const dispatch = vi.fn();

                const {container} = render(
                    <StateContext.Provider value={state}>
                        <DispatchContext.Provider value={dispatch}>
                            <TodoApp/>
                        </DispatchContext.Provider>
                    </StateContext.Provider>
                );

                expect(container).toMatchSnapshot()
            });
        })
    })

    describe('Handling user interactions', () => {
        describe('Adding a new todo', () => {
            it('dispatches a "new todo" action', async () => {
                const user = userEvent.setup()
                const state = {todos: []};
                const dispatch = vi.fn();

                render(
                    <StateContext.Provider value={state}>
                        <DispatchContext.Provider value={dispatch}>
                            <TodoApp/>
                        </DispatchContext.Provider>
                    </StateContext.Provider>
                );

                const input = screen.getByLabelText(/add new todo/i);
                await user.type(input, "cook food{enter}")

                expect(dispatch).toHaveBeenCalledWith(NewTodoAction("cook food"))
            });

            it('allows inputting multiple todos without deleting previous ', async () => {
                const user = userEvent.setup()
                const state = {todos: []};
                const dispatch = vi.fn();

                render(
                    <StateContext.Provider value={state}>
                        <DispatchContext.Provider value={dispatch}>
                            <TodoApp/>
                        </DispatchContext.Provider>
                    </StateContext.Provider>
                );

                const input = screen.getByLabelText(/add new todo/i);
                await user.type(input, "cook food{enter}")
                await user.type(input, "take out garbage{enter}")

                expect(dispatch).toHaveBeenCalledWith(NewTodoAction("cook food"))
                expect(dispatch).toHaveBeenCalledWith(NewTodoAction("take out garbage"))
            });
        })

        describe('Changing todo status', () => {
            it('dispatches a "toggle todo status" action when a todo status checkbox is checked/unchecked', async () => {
                const user = userEvent.setup()
                const todo = {
                    id: "0",
                    title: "feed the dog",
                    status: TodoStatus.Incomplete
                };
                const state = {todos: [todo]}
                const dispatch = vi.fn()
                render(
                    <StateContext.Provider value={state}>
                        <DispatchContext.Provider value={dispatch}>
                            <TodoApp/>
                        </DispatchContext.Provider>
                    </StateContext.Provider>
                );

                const checkBox = screen.getByLabelText(new RegExp(todo.title, "i"));
                await user.click(checkBox)

                expect(dispatch).toHaveBeenCalledWith(ToggleTodoStatusAction(todo))
            });
        })
    })

    describe('Loading todos on initial render', () => {
        it('dispatches the "load todos" thunk', () => {
            const state = {todos: []}
            const dispatch = vi.fn()
            render(
                <StateContext.Provider value={state}>
                    <DispatchContext.Provider value={dispatch}>
                        <TodoApp/>
                    </DispatchContext.Provider>
                </StateContext.Provider>
            );
            expect(dispatch).toHaveBeenCalledWith(LoadTodosThunk)
        })
    })
});
