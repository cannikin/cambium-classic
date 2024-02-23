const controls = [
  {
    name: 'brightness',
    label: 'Brightness',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 1,
  },
  {
    name: 'contrast',
    label: 'Contrast',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 1,
  },
  {
    name: 'hue-rotate',
    label: 'Hue',
    min: 0,
    max: 360,
    step: 1,
    defaultValue: 0,
  },
  {
    name: 'saturate',
    label: 'Saturation',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 1,
  },
  {
    name: 'grayscale',
    label: 'Black & White',
    min: 0,
    max: 100,
    step: 0.5,
    defaultValue: 0,
  },
]

const Controls = ({ refs, onChange, onShare, onReset, onResetAll }) => {
  return (
    <form className="mt-4 flex flex-col space-y-5">
      {controls.map((control, i) => (
        <div key={i} className="control">
          <label htmlFor={control.name}>
            <span>{control.label}</span>
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

      <div className="flex justify-between space-x-4 pt-4">
        <button
          type="button"
          className="w-2/3 rounded-sm bg-neutral-300 px-6 py-2 text-sm font-semibold text-neutral-800 ring-2 ring-neutral-600 transition duration-150 ease-in-out hover:scale-105 hover:bg-neutral-200"
          onClick={onShare}
        >
          Share
        </button>
        <button
          type="reset"
          className="w-1/3 rounded-sm bg-neutral-700 px-4 py-2 text-sm text-neutral-400 transition duration-150 ease-in-out hover:bg-neutral-600 hover:text-neutral-300"
          onClick={onResetAll}
        >
          Reset All
        </button>
      </div>
    </form>
  )
}

export default Controls
