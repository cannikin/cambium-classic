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

      <div className="mx-auto max-w-screen-lg xl:max-w-screen-xl">
        <ul className="flex flex-wrap justify-center">
          {photos.map((photo) => (
            <li
              key={photo.id}
              className="flex w-full cursor-pointer justify-center p-2 transition duration-150 ease-in-out hover:scale-110 md:w-1/3 lg:w-1/4 xl:w-1/5"
              onClick={() => onClick(photo)}
            >
              <div className="flex items-center">
                <img
                  src={`/photos/${photo.filename}`}
                  alt={`id ${photo.id}`}
                  className="rounded-sm object-cover md:max-h-50"
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
