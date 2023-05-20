type Dispatch<Action> = (action: Action) => void

export type Thunk<Action> = (dispatch: Dispatch<Action>) => void

function isThunk<Action>(maybeThunk: MaybeThunk<Action>): maybeThunk is Thunk<Action> {
    return typeof maybeThunk === 'function'
}

type MaybeThunk<Action> = Action | Thunk<Action>

export type ThunkDispatch<Action> = (maybeThunk: MaybeThunk<Action>) => void

export function createActionOrThunkDispatch<Action>(dispatch: Dispatch<Action>): ThunkDispatch<Action> {
    return (maybeThunk: MaybeThunk<Action>) => {
        if (isThunk(maybeThunk)) {
            maybeThunk(dispatch)
            return
        }
        dispatch(maybeThunk)
    }
}
