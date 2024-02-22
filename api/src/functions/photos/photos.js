import fs from 'node:fs'
import path from 'node:path'

const files = fs
  .readdirSync(
    path.join(
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
  )
  .filter((file) => !file.match(/^\.DS_Store$/))

const photos = files.map((filename, id) => ({ id: id + 1, filename }))

const photoDetails = (id) => {
  const photo = photos.find((photo) => photo.id === id)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(photo),
  }
}

const allPhotos = () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(photos),
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
    return photoDetails(id)
  } else if (event.path.match(/photos\/?$/)) {
    return allPhotos()
  } else {
    return notFound()
  }
}
