
const initialState = {
    initialized: true,
    errorCode: 0,
    error: ''
};


type AppReducerType = typeof initialState

export const appReducer = (state: AppReducerType = initialState, action: AppActionsType): AppReducerType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS': {
            return { ...state, initialized: action.status }
        }
        case 'APP/ERROR_CODE': {
            return { ...state, errorCode: action.code }
        }
        case 'APP/ERROR_MESSAGE': {
            return { ...state, error: action.error }
        }
        default:
            return state;
    }
};


export const initializedSuccess = (status: boolean) =>
    ({ type: 'APP/INITIALIZED_SUCCESS', status } as const)

export const errorCode = (code: number) =>
    ({ type: 'APP/ERROR_CODE', code } as const)

export const errorMessage = (error: string) =>
    ({ type: 'APP/ERROR_MESSAGE', error } as const)



type InitializedSuccessType = ReturnType<typeof initializedSuccess>
type ErrorCodeType = ReturnType<typeof errorCode>
type ErrorMessageType = ReturnType<typeof errorMessage>

export type AppActionsType = InitializedSuccessType | ErrorMessageType | ErrorCodeType

export default appReducer
