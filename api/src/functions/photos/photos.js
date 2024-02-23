/* eslint-disable no-new */
import fs from 'node:fs'
import path from 'node:path'

import ExifImage from 'exif'

const EXCLUDE_FILES = ['.DS_Store', '.keep']

const photosPath = path.join(
  __filename,
  '..',
  '..',
  '..',
  '..',
  '..',
  'web',
  'public',
  'photos'
)

const files = fs
  .readdirSync(photosPath)
  .filter((file) => !EXCLUDE_FILES.includes(file))

const getMetadata = (filename) => {
  return new Promise((resolve, reject) => {
    new ExifImage(
      {
        image: path.join(photosPath, filename),
      },
      (error, data) => (error ? reject(error) : resolve(data))
    )
  })
}

const getPhotos = async () => {
  const photos = []
  let id = 1

  for (const filename of files) {
    const metadata = await getMetadata(filename)
    const fStop = Math.round(1.4142 ** metadata.exif.ApertureValue * 10) / 10
    const shutterSpeed = `1/${1 / metadata.exif.ExposureTime}`

    photos.push({
      id: id++,
      filename,
      metadata: {
        image: { ...metadata.image },
        exif: {
          ...metadata.exif,
          FNumber: fStop,
          ShutterSpeedNumber: shutterSpeed,
        },
      },
    })
  }

  return photos
}

const photoDetails = async (id) => {
  const photo = (await getPhotos({ metadata: true })).find(
    (photo) => photo.id === id
  )

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(photo),
  }
}

const allPhotos = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(await getPhotos({ metadata: false })),
  }
}

const notFound = () => {
  return {
    statusCode: 404,
    body: 'Not found',
  }
}

export const handler = async (event) => {
  if (event.path.match(/photos\/(\d+)\/?$/)) {
    const id = parseInt(event.path.match(/photos\/(\d+)/)[1])
    return await photoDetails(id)
  } else if (event.path.match(/photos\/?$/)) {
    return await allPhotos()
  } else {
    return notFound()
  }
}
