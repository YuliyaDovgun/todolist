const initStateType = {
    status: '' as appStatusType,
    error: ''
}

export const appReducer = (state = initStateType, action: appActionType): appStateType => {
    switch (action.type){
        case "APP/SET-STATUS": return {...state, status: action.status}
        default: return state
    }
}

export const setAppStatusAC = (status: appStatusType) => ({type: 'APP/SET-STATUS', status})

export type appStatusType = 'idle' | 'loading' | 'success' | 'failed'
type appStateType = typeof initStateType
export type appActionType = ReturnType<typeof setAppStatusAC>