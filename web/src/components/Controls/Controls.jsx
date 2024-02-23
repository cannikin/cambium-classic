const Controls = ({ refs, onChange, onShare, onReset, onResetAll }) => {
  return (
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
