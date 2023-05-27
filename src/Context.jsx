import React, {createContext, useState} from 'react'

export const appContext = createContext();
const Context = ({children}) => {
  const [user,setUser] = useState(null);
  const value = {
    user,
    setUser
  }
  return (
    <appContext.Provider value={value}>
        {children}
    </appContext.Provider>
  )
}

export default Context