import { useEffect, useRef, useState } from 'react'

import { Tab, Transition } from '@headlessui/react'
import clsx from 'clsx'

import Controls from 'src/components/Controls'
import Metadata from 'src/components/Metadata'
import { useEditContext } from 'src/contexts/EditContext'

const DEFAULT_ADJUSTMENTS = {
  brightness: 1,
  contrast: 1,
  grayscale: 0,
  'hue-rotate': 0,
  saturate: 1,
  sepia: 0,
}

const TABS = [
  { name: 'tools', label: 'Tools' },
  { name: 'metadata', label: 'Metadata' },
]

const EditPage = ({ id }) => {
  const [photo, setPhoto] = useState({})
  const [showImage, setShowImage] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showControls, setShowControls] = useState(false)
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

  const { selectedTabIndex, setSelectedTabIndex } = useEditContext()

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

  const onImageLoad = () => {
    setShowImage(true)

    setTimeout(() => {
      setShowTitle(true)
    }, 250)

    setTimeout(() => {
      setShowControls(true)
    }, 500)
  }

  const onTabChange = (index) => {
    setSelectedTabIndex(index)
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

      <div className="md:flex md:space-x-4">
        <img
          src={`/photos/${photo.filename}`}
          alt={`id ${id}`}
          className="hidden"
          onLoad={onImageLoad}
        />

        <div className="flex w-full justify-center md:w-2/3">
          <div className="mx-0 md:ml-4">
            <Transition
              className="transform ease-out"
              enter="transition duration-500"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              show={showImage}
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
                  'shadow shadow-black filter md:rounded'
                )}
                style={{ maxHeight: windowHeight - 50 }}
              />
            </Transition>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="mr-6">
            <Transition
              className="transform ease-out"
              enter="transition duration-1000"
              enterFrom="opacity-0 translate-x-4"
              enterTo="opacity-100 translate-x-0"
              show={showTitle}
            >
              <h2 className="mt-4 border-b-2 border-neutral-600 pb-2 text-xl font-semibold text-neutral-300 md:mt-0">
                {photo.filename}
              </h2>
            </Transition>

            <Transition
              className="ease transform"
              enter="transition duration-500"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              show={showControls}
            >
              <div className="mt-4">
                <Tab.Group
                  defaultIndex={selectedTabIndex}
                  onChange={onTabChange}
                >
                  <Tab.List className="ml-2">
                    {TABS.map((tab, i) => (
                      <Tab
                        key={i}
                        className={({ selected }) =>
                          clsx(
                            selected
                              ? 'bg-neutral-900 text-neutral-300 focus:outline-none'
                              : 'bg-transparent text-neutral-500',
                            'rounded-t px-4 py-2 text-sm font-semibold'
                          )
                        }
                      >
                        {tab.label}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="rounded-md bg-neutral-900 p-4">
                    <Tab.Panel>
                      <Controls
                        refs={refs}
                        onChange={onChange}
                        onShare={onShare}
                        onReset={onReset}
                        onResetAll={onResetAll}
                      />
                    </Tab.Panel>
                    <Tab.Panel>
                      <Metadata photo={photo} />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPage
