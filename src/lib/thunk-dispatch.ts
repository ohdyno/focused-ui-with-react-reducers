type Dispatch<Action> = (action: Action) => void

export type Thunk<State, Action> = (dispatch: Dispatch<Action>, getState: () => State) => void

function isThunk<State, Action>(maybeThunk: MaybeThunk<State, Action>): maybeThunk is Thunk<State, Action> {
    return typeof maybeThunk === 'function'
}

type MaybeThunk<State, Action> = Action | Thunk<State, Action>

export type ThunkDispatch<State, Action> = (maybeThunk: MaybeThunk<State, Action>) => void

export function createActionOrThunkDispatch<State, Action>(dispatch: Dispatch<Action>, getState: () => State): ThunkDispatch<State, Action> {
    return (maybeThunk: MaybeThunk<State, Action>) => {
        if (isThunk(maybeThunk)) {
            maybeThunk(dispatch, getState)
            return
        }
        dispatch(maybeThunk)
    }
}
