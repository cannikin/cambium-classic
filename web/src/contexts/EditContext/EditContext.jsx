import { createContext, useContext, useState } from 'react'

export const EditContext = createContext()

export const EditContextProvider = ({ children }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState('tools')

  return (
    <EditContext.Provider value={{ selectedTabIndex, setSelectedTabIndex }}>
      {children}
    </EditContext.Provider>
  )
}

export const useEditContext = () => {
  const context = useContext(EditContext)

  if (!context) {
    throw 'useEditContext must be used within a EditContextProvider'
  }

  return context
}
