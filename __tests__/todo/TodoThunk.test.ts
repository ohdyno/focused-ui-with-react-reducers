import {describe, expect, it, vi} from "vitest";
import {LoadTodosThunk} from "../../src/todo/TodoThunks";
import {server} from "../setupMSW";
import {rest} from "msw";
import {waitFor} from "@testing-library/react";
import {TodoStatus} from "../../src/todo/TodoReducer";
import {LoadTodosAction} from "../../src/todo/TodoActions";

describe('Todo Thunks', () => {
    describe('Load Todos', () => {
        it('dispatches the "load todos" action with the todos from the API if successful', async () => {
            const todos = [
                {
                    id: "0",
                    title: "feed the dog",
                    status: TodoStatus.Incomplete
                }
            ]
            server.use(
                rest.get("https://xingzhou.me/stub-apis/todos", (req, res, ctx) => {
                    return res(
                        ctx.status(200),
                        ctx.json(todos)
                    )
                })
            )

            const dispatch = vi.fn();
            LoadTodosThunk(dispatch)

            await waitFor(() => expect(dispatch).toHaveBeenCalledWith(LoadTodosAction(todos)))
        });

        it.skip('dispatches the "fail to load todos" action if the API call fails', () => {

        });
    })
})
