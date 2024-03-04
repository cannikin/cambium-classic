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

export const photos = () => {
  const files = fs
    .readdirSync(photosPath)
    .filter((file) => !EXCLUDE_FILES.includes(file))

  const photos = []
  let id = 1

  for (const filename of files) {
    photos.push({
      id: id++,
      filename,
    })
  }

  return photos
}

export const photo = async ({ id }) => {
  const files = fs
    .readdirSync(photosPath)
    .filter((file) => !EXCLUDE_FILES.includes(file))
  const filename = files[id - 1]

  const { image: imageMetadata, exif: exifMetadata } = await getMetadata(
    filename
  )
  const fStop = Math.round(1.4142 ** exifMetadata.ApertureValue * 10) / 10
  const shutterSpeed = `1/${1 / exifMetadata.ExposureTime}`

  const output = {
    id,
    filename,
    metadata: {
      image: {
        Make: imageMetadata.Make,
        Model: imageMetadata.Model,
        XResolution: imageMetadata.XResolution,
        YResolution: imageMetadata.YResolution,
      },
      exif: {
        DateTimeOriginal: exifMetadata.DateTimeOriginal,
        ExifImageHeight: exifMetadata.ExifImageHeight,
        ExifImageWidth: exifMetadata.ExifImageWidth,
        FNumber: fStop,
        FocalLength: exifMetadata.FocalLength,
        ISO: exifMetadata.ISO,
        ShutterSpeedNumber: shutterSpeed,
      },
    },
  }

  console.info(output)

  return output
}
