import { useEffect, useState } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Slide from 'src/components/Slide'

const HomePage = () => {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetch('/.redwood/functions/photos')
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data)
      })
  }, [])

  const onClick = (photo) => {
    navigate(routes.edit({ id: photo.id }))
  }

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <div className="">
        <ul className="flex flex-wrap justify-center">
          {photos?.map((photo) => (
            <Slide photo={photo} key={photo.id} onClick={onClick} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default HomePage
