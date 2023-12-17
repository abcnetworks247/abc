import { useContext, createContext } from "react";

const Usercintext = createContext()


export function UserContextProvider({childeren}) {
    
    return <Usercintext.Provider value={{}}>
             {childeren}
    </Usercintext.Provider>
}


export  function UseUsercontext(){
    const usercontext =  UseUsercontext()

    if(!usercontext){
        throw new Error('user context is not available for use')
    }

    return usercontext
} 