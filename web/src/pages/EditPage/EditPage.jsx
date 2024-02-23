import { useEffect, useRef, useState } from 'react'

import { Transition } from '@headlessui/react'
import clsx from 'clsx'

import Controls from 'src/components/Controls'
import Metadata from 'src/components/Metadata'

const DEFAULT_ADJUSTMENTS = {
  brightness: 1,
  contrast: 1,
  grayscale: 0,
  'hue-rotate': 0,
  saturate: 1,
  sepia: 0,
}

const EditPage = ({ id }) => {
  const [photo, setPhoto] = useState({})
  const [show, setShow] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [showMetadata, setShowMetadata] = useState(false)
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

  const onResetAll = () => {
    setAdjustments(DEFAULT_ADJUSTMENTS)
  }

  const onShare = () => {
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

  useEffect(() => {
    setTimeout(() => {
      setShowControls(show)
    }, 150)

    setTimeout(() => {
      setShowMetadata(show)
    }, 250)
  }, [show])

  const onResize = () => {
    setWindowHeight(window.innerHeight - 40)
  }

  return (
    <>
      <Metadata title={`Edit ${photo.filename}`} description="Edit a photo" />

      <div className="space-x-4 md:flex">
        <img
          src={`/photos/${photo.filename}`}
          alt={`id ${id}`}
          className="hidden"
          onLoad={() => setShow(true)}
        />

        <div className="flex w-full justify-center md:w-3/4">
          <div className="mx-0 md:ml-4">
            <Transition
              className="transform ease-out"
              enter="transition duration-500"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              show={show}
            >
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
            </Transition>
          </div>
        </div>
        <div className="w-1/4">
          <div className="mr-6">
            <h2 className="border-b-2 border-neutral-600 pb-2 text-xl font-semibold text-neutral-300">
              {photo.filename}
            </h2>

            <Transition
              className="ease transform"
              enter="transition duration-1000"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              show={showControls}
            >
              <Controls
                refs={refs}
                onChange={onChange}
                onShare={onShare}
                onReset={onReset}
                onResetAll={onResetAll}
              />
            </Transition>
          </div>
        </div>
      </div>
      <Transition
        className="ease transform"
        enter="transition duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        show={showMetadata}
      >
        <Metadata photo={photo} />
      </Transition>
    </>
  )
}

export default EditPage
