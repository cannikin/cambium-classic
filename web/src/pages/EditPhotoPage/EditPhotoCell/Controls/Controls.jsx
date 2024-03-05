import {
  EyeDropperIcon,
  EyeIcon,
  GlobeAltIcon,
  NoSymbolIcon,
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
    icon: <NoSymbolIcon className="h-5 w-5" />,
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

const Controls = ({ refs, onChange, onReset }) => {
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
    </form>
  )
}

export default Controls
