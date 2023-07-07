import {appReducer, appStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";


let app: appStateType

beforeEach(() => {
    app = {
        status: 'idle',
        error: null,
    }
})
test('app status should be changed', () => {

    const newAppStatus = 'success'

    const newAppState = appReducer(app, setAppStatusAC(newAppStatus))

    expect(newAppState.status).toBe('success')
})
test('app error should be changed', () => {

    const newAppError = 'some error'

    const newAppState = appReducer(app, setAppErrorAC(newAppError))

    expect(newAppState.error).toBe('some error')
})