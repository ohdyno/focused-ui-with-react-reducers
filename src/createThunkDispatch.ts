type Dispatch<Action> = (action: Action) => void

export type Thunk<Action> = (dispatch: Dispatch<Action>) => void;

function isThunk<Action>(arg: Action | Thunk<Action>): arg is Thunk<Action> {
    return typeof arg === 'function';
}

export type ThunkDispatch<Action> = (arg: Action | Thunk<Action>) => void

export default function createThunkDispatch<Action>(dispatch: Dispatch<Action>): ThunkDispatch<Action> {
    return (arg: Action | Thunk<Action>) => {
        if (isThunk(arg)) {
            arg(dispatch)
            return
        }
        dispatch(arg)
    }
}
