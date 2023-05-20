import {describe, expect, it} from "vitest";
import reducer, {TodoItem, TodoState, TodoStatus} from "../../src/todo/store/TodoReducer";
import {NewTodoAction, ToggleTodoStatusAction} from "../../src/todo/store/TodoActions";

describe('Todo Reducer', () => {
    describe('Handles "new todo" action', () => {
        it('adds the new todo to the beginning of the todo list', () => {
            const firstTodoItem: TodoItem = {
                id: "0",
                title: 'first todo',
                status: TodoStatus.Incomplete
            }

            const initialState: TodoState = {
                todos: [firstTodoItem]
            }

            const result = reducer(initialState, NewTodoAction("a new todo"))

            expect(result.todos).toEqual([
                {
                    id: expect.any(String),
                    title: 'a new todo',
                    status: TodoStatus.Incomplete
                },
                firstTodoItem,
            ])
        })

        it('does not modify the todo list if the action has empty content (including whitespaces)', () => {
            const firstTodoItem: TodoItem = {
                id: "0",
                title: 'first todo',
                status: TodoStatus.Incomplete
            }

            const initialState: TodoState = {
                todos: [firstTodoItem]
            }

            const result = reducer(initialState, NewTodoAction("            "))

            expect(result).toEqual(initialState)
        })
    })

    describe('Handles "toggle todo status" action', () => {
        it(`changes the status from "${TodoStatus.Incomplete}" to "${TodoStatus.Complete}"`, () => {
            const firstTodoItem: TodoItem = {
                id: "0",
                title: 'first todo',
                status: TodoStatus.Incomplete
            }

            const initialState: TodoState = {
                todos: [firstTodoItem]
            }

            const result = reducer(initialState, ToggleTodoStatusAction(firstTodoItem))

            expect(result.todos).toEqual([
                {
                    ...firstTodoItem,
                    status: TodoStatus.Complete
                }
            ])
        })

        it(`changes the status from "${TodoStatus.Complete}" to "${TodoStatus.Incomplete}"`, () => {
            const firstTodoItem: TodoItem = {
                id: "0",
                title: 'first todo',
                status: TodoStatus.Complete
            }

            const initialState: TodoState = {
                todos: [firstTodoItem]
            }

            const result = reducer(initialState, ToggleTodoStatusAction(firstTodoItem))

            expect(result.todos).toEqual([
                {
                    ...firstTodoItem,
                    status: TodoStatus.Incomplete
                }
            ])
        })
    })
})
