const initStateType = {
    status: 'idle' as appStatusType,
    error: null as null | string,
}

export const appReducer = (state = initStateType, action: appActionType): appStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: appStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)

export type appStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type appStateType = typeof initStateType

export type setAppStatusAT = ReturnType<typeof setAppStatusAC>
export type setAppErrorAT = ReturnType<typeof setAppErrorAC>
export type appActionType =
    setAppStatusAT
    | setAppErrorAT