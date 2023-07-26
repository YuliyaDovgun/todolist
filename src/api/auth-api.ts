import {instance} from "./instance";

export const authAPI = {
    authMe: () => {
        return instance.get<responseType<authMeDataType>>(`auth/me`)
    },
    login: (data: loginParamsType) => {
        return instance.post<responseType<{ userId: number }>>('auth/login', data)
    },
    logout: () => {

    },
}

type authMeDataType = {
    id: number
    email: string
    login: string
}
type responseType<T = {}> = {
    data: T,
    resultCode: number,
    messages: string[],
}

export type loginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: boolean,
}
