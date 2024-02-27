import { createContext, useContext, useState } from 'react'

export const ShareContext = createContext()

export const ShareContextProvider = ({ children }) => {
  const [show, setShow] = useState(false)

  return (
    <ShareContext.Provider value={{ show, setShow }}>
      {children}
    </ShareContext.Provider>
  )
}

export const useShareContext = () => {
  const context = useContext(ShareContext)

  if (!context) {
    throw 'useShareContext must be used within a ShareContextProvider'
  }

  return context
}
