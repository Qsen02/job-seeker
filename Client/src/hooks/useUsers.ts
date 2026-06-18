import { login, register } from "../api/users";

export function useRegister() { 
    return async function (data:Object) { 
        return await register(data);
    }
}

export function useLogin() { 
    return async function (data: Object) { 
        return await login(data);
    }
}