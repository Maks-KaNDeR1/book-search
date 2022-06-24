import { requestBooks } from "./books-reducer";

const initialState = {
    initialized: true
};


type AppReducerType = typeof initialState

export const appReducer = (state: AppReducerType = initialState, action: AppActionsType): AppReducerType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: action.status
            }
        }
        default:
            return state;
    }
};



// export const initializedSuccess = () => ({ type: 'INITIALIZED_SUCCESS' } as const)

// export const initializeApp = () => async (dispatch: any) => {
//     let promise = dispatch(requestBooks())
//     Promise.all([promise])
//     dispatch(initializedSuccess())
// }


export const initializedSuccess = (status: boolean) =>
    ({ type: 'APP/INITIALIZED_SUCCESS', status } as const)

type InitializedSuccessType = ReturnType<typeof initializedSuccess>

export type AppActionsType = InitializedSuccessType

export default appReducer
