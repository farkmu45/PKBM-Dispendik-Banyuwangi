import { createContext } from 'react'

const AuthContext = createContext({
  auth: { isAdmin: false, signedIn: false },
  setAuth() {},
})

export { AuthContext }
