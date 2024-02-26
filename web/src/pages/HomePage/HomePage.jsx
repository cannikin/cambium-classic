import { useEffect, useState } from 'react'

import Slide from 'src/components/Slide'

const HomePage = () => {
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

  const BlankWrapper = ({ children }) => {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">{children}</div>
      </div>
    )
  }

  if (loading) {
    return (
      <BlankWrapper>
        <h2 className="mb-4 text-lg text-neutral-500">Loading photos...</h2>
      </BlankWrapper>
    )
  }

  // no photos in web/public/photos
  if (photos.length === 0 && !loading) {
    return (
      <BlankWrapper>
        <h2 className="mb-4 text-2xl font-semibold text-neutral-500">
          No photos found
        </h2>
        <p className="text-neutral-600">
          Add photos to <code>web/public/photos</code> to get started.
        </p>
      </BlankWrapper>
    )
  }

  return (
    <>
      <div className="">
        <ul className="flex flex-wrap justify-center">
          {photos.map((photo) => (
            <Slide photo={photo} key={photo.id} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default HomePage
