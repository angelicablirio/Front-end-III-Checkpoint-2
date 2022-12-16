import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { getTokenLocalStorage } from "../utils/tokenLocalStorage";

const AuthContext = createContext()

export function AuthProvider(props) {

    useEffect(()=>{
        
        let authLocalStorage = getTokenLocalStorage();

        if(authLocalStorage === null){
            authLocalStorage = ''
            localStorage.setItem('auth', '');
        }
        setAuthState({
            auth: authLocalStorage
        })
    },[]);

    const [authState, setAuthState] = useState({
        auth: ''
    });

    function changeAuth(action) {
        switch (action.state) {
            case 'auth':
                localStorage.setItem('auth', action.auth)
                setAuthState({
                    auth: action.auth,
                })
                break;
            default:
                throw new Error('Action não encontrada')
        }
    };

    return(
        <AuthContext.Provider value={{authState, changeAuth}}>
            { props.children }
        </AuthContext.Provider>
    )

}

export function useAuthContext() {
    const context = useContext(AuthContext)
    return context
}