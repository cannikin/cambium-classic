/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { photos } from 'web/src/lib/data'

import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  const onClick = (photo) => {
    navigate(routes.edit({ id: photo.id }))
  }

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <div className="mx-auto max-w-screen-xl">
        <ul className="flex flex-wrap justify-center">
          {photos.map((photo) => (
            <li
              key={photo.id}
              className="flex max-h-50 w-56 cursor-pointer justify-center p-2 transition duration-150 ease-in-out hover:scale-110"
              onClick={() => onClick(photo)}
            >
              <div className="">
                <img
                  src={`/photos/${photo.filename}`}
                  alt={`id ${photo.id}`}
                  className="h-full rounded-sm object-contain"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default HomePage
