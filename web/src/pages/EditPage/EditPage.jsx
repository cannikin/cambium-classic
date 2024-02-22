import { useEffect, useState } from 'react'

import { photos } from 'web/src/lib/data'

import { Metadata } from '@redwoodjs/web'

const EditPage = ({ id }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const photo = photos.find((photo) => photo.id === parseInt(id))

  useEffect(() => {
    window.addEventListener('resize', onResize)
    onResize()
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const onResize = () => {
    setWindowHeight(window.innerHeight)
  }

  return (
    <>
      <Metadata title="Edit" description="Edit page" />

      <div className="mx-auto max-w-screen-lg justify-center space-x-4 md:flex">
        <div className="flex w-full justify-center md:w-3/4">
          <img
            src={`/photos/${photo.filename}`}
            alt={`id ${id}`}
            className="rounded"
            style={{ maxHeight: windowHeight - 50 }}
          />
        </div>
        <div className="w-1/4">
          <h2 className="text-xl font-semibold">{photo.filename}</h2>
        </div>
      </div>
    </>
  )
}

export default EditPage
