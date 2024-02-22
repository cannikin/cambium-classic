import { useEffect, useState } from 'react'

import { photos } from 'web/src/lib/data'

import { Metadata } from '@redwoodjs/web'

const EditPage = ({ id }) => {
  const [photo, setPhoto] = useState({})
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  // resize the height of portrait photos so they fit in the browser
  useEffect(() => {
    window.addEventListener('resize', onResize)
    onResize()
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    fetch(`/.redwood/functions/photos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPhoto(data)
      })
  }, [id])

  const onResize = () => {
    setWindowHeight(window.innerHeight - 40)
  }

  return (
    <>
      <Metadata title={`Edit ${photo.filename}`} description="Edit a photo" />

      <div className="space-x-4 md:flex">
        <div className="flex w-full justify-center md:w-3/4">
          <div className="mx-2">
            <img
              src={`/photos/${photo.filename}`}
              alt={`id ${id}`}
              className="rounded shadow-lg"
              style={{ maxHeight: windowHeight - 50 }}
            />
          </div>
        </div>
        <div className="w-1/4 text-white">
          <h2 className="text-xl font-semibold">{photo.filename}</h2>
        </div>
      </div>
    </>
  )
}

export default EditPage
