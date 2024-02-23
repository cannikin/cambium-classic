import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import { format } from 'date-fns'

import { Metadata } from '@redwoodjs/web'

const DEFAULT_ADJUSTMENTS = {
  brightness: 1,
  contrast: 1,
  grayscale: 0,
  'hue-rotate': 0,
  saturate: 1,
  sepia: 0,
}

// this is just so these strings exist somewhere and Tailwind will see them and
// add them to the allowlist of classes

// preset values so that Tailwind allowlist picks them up
//

const EditPage = ({ id }) => {
  const [photo, setPhoto] = useState({})
  const [adjustments, setAdjustments] = useState(DEFAULT_ADJUSTMENTS)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const refs = {
    brightness: useRef(),
    contrast: useRef(),
    grayscale: useRef(),
    'hue-rotate': useRef(),
    saturate: useRef(),
    sepia: useRef(),
  }

  const onChange = (event) => {
    setAdjustments({
      ...adjustments,
      [event.target.name]: event.target.value,
    })
  }

  const onReset = (name) => {
    setAdjustments({
      ...adjustments,
      [name]: DEFAULT_ADJUSTMENTS[name],
    })
    refs[name].current.value = DEFAULT_ADJUSTMENTS[name]
  }

  const onClickReset = () => {
    setAdjustments(DEFAULT_ADJUSTMENTS)
  }

  const onClickShare = () => {
    console.info('share')
  }

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
          <div className="mx-0 md:ml-4">
            <img
              src={`/photos/${photo.filename}`}
              alt={`id ${id}`}
              className={clsx(
                `brightness-[${adjustments.brightness}]`,
                `contrast-[${adjustments.contrast}]`,
                `grayscale-[${adjustments.grayscale}%]`,
                `hue-rotate-[${adjustments['hue-rotate']}deg]`,
                `saturate-[${adjustments.saturate}]`,
                `sepia-[${adjustments.sepia}]`,
                'rounded shadow shadow-black filter'
              )}
              style={{ maxHeight: windowHeight - 50 }}
            />
          </div>
        </div>
        <div className="w-1/4">
          <div className="mr-6">
            <h2 className="border-b-2 border-neutral-600 pb-2 text-xl font-semibold text-neutral-300">
              {photo.filename}
            </h2>

            <form className="mt-4 flex flex-col space-y-5">
              <div>
                <label htmlFor="brightness">
                  <span>Brightness</span>
                  <button
                    type="button"
                    className="reset"
                    onClick={() => onReset('brightness')}
                  >
                    Reset
                  </button>
                </label>
                <input
                  type="range"
                  name="brightness"
                  ref={refs.brightness}
                  onChange={onChange}
                  defaultValue={1}
                  min={0}
                  max={3}
                  step={0.01}
                />
              </div>

              <div className="control">
                <label htmlFor="contrast">
                  <span>Contrast</span>
                  <button
                    type="button"
                    className="reset"
                    onClick={() => onReset('contrast')}
                  >
                    Reset
                  </button>
                </label>
                <input
                  type="range"
                  name="contrast"
                  ref={refs.contrast}
                  onChange={onChange}
                  defaultValue={1}
                  min={0}
                  max={3}
                  step={0.01}
                />
              </div>

              <div className="control">
                <label htmlFor="hue-rotate">
                  <span>Hue</span>{' '}
                  <button
                    type="button"
                    className="reset"
                    onClick={() => onReset('hue-rotate')}
                  >
                    Reset
                  </button>
                </label>
                <input
                  type="range"
                  name="hue-rotate"
                  ref={refs['hue-rotate']}
                  onChange={onChange}
                  defaultValue={0}
                  min={0}
                  max={360}
                  step={1}
                />
              </div>

              <div className="control">
                <label htmlFor="saturate">
                  <span>Saturation</span>{' '}
                  <button
                    type="button"
                    className="reset"
                    onClick={() => onReset('saturate')}
                  >
                    Reset
                  </button>
                </label>
                <input
                  type="range"
                  name="saturate"
                  ref={refs.saturate}
                  onChange={onChange}
                  defaultValue={1}
                  min={0}
                  max={3}
                  step={0.01}
                />
              </div>

              <div className="control">
                <label htmlFor="grayscale">
                  <span>Black & White</span>{' '}
                  <button
                    type="button"
                    className="reset"
                    onClick={() => onReset('grayscale')}
                  >
                    Reset
                  </button>
                </label>
                <input
                  type="range"
                  name="grayscale"
                  ref={refs.grayscale}
                  onChange={onChange}
                  defaultValue={0}
                  min={0}
                  max={100}
                  step={0.5}
                />
              </div>

              {/* <div className="control">
                <label htmlFor="sepia">
                <span>Sepia Tone</span>
                  <button
                    type="button"
                    className="reset"
                    onClick={() => onReset('sepia')}
                  >
                    Reset
                  </button>
                </label>
                <input
                  type="range"
                  name="sepia"
                  ref={refs.sepia}
                  onChange={onChange}
                  defaultValue={0}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div> */}

              <div className="flex justify-between space-x-4 pt-4">
                <button
                  type="button"
                  className="w-2/3 rounded-sm bg-neutral-300 px-6 py-2 text-sm font-semibold text-neutral-800 ring-2 ring-neutral-600 transition duration-150 ease-in-out hover:scale-105 hover:bg-neutral-200"
                  onClick={onClickShare}
                >
                  Share
                </button>
                <button
                  type="reset"
                  className="w-1/3 rounded-sm bg-neutral-700 px-4 py-2 text-sm text-neutral-400 transition duration-150 ease-in-out hover:bg-neutral-600 hover:text-neutral-300"
                  onClick={onClickReset}
                >
                  Reset All
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {photo?.metadata && (
        <div className="mx-4 mt-8 items-start md:flex md:space-x-8">
          <table className="metadata w-full">
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
            </tbody>
          </table>

          <table className="metadata w-full">
            <tbody>
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
            </tbody>
          </table>

          <table className="metadata w-full">
            <tbody>
              <tr>
                <td>Shutter Speed</td>
                <td>{photo.metadata.exif.ShutterSpeedNumber}</td>
              </tr>
              <tr>
                <td>Aperture</td>
                <td>f/{photo.metadata.exif.FNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default EditPage
