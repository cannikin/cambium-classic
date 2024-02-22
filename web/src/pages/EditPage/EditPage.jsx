import { useEffect, useState } from 'react'

import { format } from 'date-fns'

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

  console.info(photo.metadata)

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
          <div className="mr-2">
            <h2 className="border-b border-neutral-500 pb-2 text-xl font-semibold">
              {photo.filename}
            </h2>

            {photo?.metadata && (
              <table className="metadata mt-4 w-full">
                <tbody>
                  <tr>
                    <td>Date</td>
                    <td>
                      {format(
                        new Date(
                          photo.metadata.exif.DateTimeOriginal.replace(
                            /^(\d+):(\d+):(\d+) /,
                            '$1-$2-$3T'
                          )
                        ),
                        'PP pp'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Size</td>
                    <td>
                      {photo.metadata.exif.ExifImageWidth} x{' '}
                      {photo.metadata.exif.ExifImageHeight}
                    </td>
                  </tr>
                  <tr>
                    <td>Resolution</td>
                    <td>{photo.metadata.image.XResolution} ppi</td>
                  </tr>
                  <tr>
                    <td>Camera</td>
                    <td>
                      {photo.metadata.image.Make} {photo.metadata.image.Model}
                    </td>
                  </tr>
                  <tr>
                    <td>Focal Length</td>
                    <td>{photo.metadata.exif.FocalLength}mm</td>
                  </tr>
                  <tr>
                    <td>ISO</td>
                    <td>{photo.metadata.exif.ISO}</td>
                  </tr>
                  <tr>
                    <td>Shutter Speed</td>
                    <td>{photo.metadata.exif.ShutterSpeedNumber}</td>
                  </tr>
                  <tr>
                    <td>F-stop</td>
                    <td>f/{photo.metadata.exif.FNumber}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPage
