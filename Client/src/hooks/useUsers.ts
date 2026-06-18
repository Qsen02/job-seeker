import { register } from "../api/users";

export function useRegister() { 
    return async function (data:Object) { 
        return await register(data);
    }
}