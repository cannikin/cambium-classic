import { createContext, useContext, useEffect, useState } from 'react'

export const PhotosContext = createContext()

export const PhotosContextProvider = ({ children }) => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/.redwood/functions/photos')
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data)
        setLoading(false)
      })
  }, [])

  return (
    <PhotosContext.Provider value={{ photos, loading }}>
      {children}
    </PhotosContext.Provider>
  )
}

export const usePhotosContext = () => {
  const context = useContext(PhotosContext)

  if (!context) {
    throw 'usePhotosContext must be used within a PhotosContextProvider'
  }

  return context
}
