import {
  EyeDropperIcon,
  EyeIcon,
  GlobeAltIcon,
  ArrowsPointingInIcon,
  SparklesIcon,
  SunIcon,
} from '@heroicons/react/24/solid'

import { useParams } from '@redwoodjs/router'

const CONTROLS = [
  {
    name: 'brightness',
    label: 'Brightness',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 1,
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    name: 'contrast',
    label: 'Contrast',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 1,
    icon: <ArrowsPointingInIcon className="h-5 w-5" />,
  },
  {
    name: 'hue-rotate',
    label: 'Hue',
    min: 0,
    max: 360,
    step: 1,
    defaultValue: 0,
    icon: <GlobeAltIcon className="h-4 w-4" />,
  },
  {
    name: 'saturate',
    label: 'Saturation',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 1,
    icon: <EyeDropperIcon className="h-4 w-4" />,
  },
  {
    name: 'grain',
    label: 'Grain',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0,
    icon: <SparklesIcon className="h-4 w-4" />,
  },
]

const Controls = ({ refs, onChange, onReset, onResetAll }) => {
  const params = useParams()

  // override any defaultValues that are in the URL
  const controls = CONTROLS.map((control) => {
    return {
      ...control,
      defaultValue: params[control.name] || control.defaultValue,
    }
  })

  return (
    <form className="flex flex-col space-y-5">
      {controls.map((control, i) => (
        <div key={i} className="control">
          <label htmlFor={control.name}>
            <div className="justify-left flex items-center space-x-1">
              {control.icon}
              <span>{control.label}</span>
            </div>
            <button
              type="button"
              className="reset"
              onClick={() => onReset(control.name)}
            >
              Reset
            </button>
          </label>
          <input
            type="range"
            name={control.name}
            ref={refs[control.name]}
            onChange={onChange}
            defaultValue={control.defaultValue}
            min={control.min}
            max={control.max}
            step={control.step}
          />
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="reset"
          className="w-full whitespace-nowrap rounded-sm bg-neutral-700 px-2 py-2 text-sm text-neutral-400 transition duration-150 ease-in-out hover:bg-neutral-600 hover:text-neutral-300 lg:w-1/3"
          onClick={onResetAll}
        >
          Reset All
        </button>
      </div>
    </form>
  )
}

export default Controls
