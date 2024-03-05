const ShareActions = ({ onShare, onResetAll }) => {
  return (
    <div className="flex flex-col justify-between space-y-2 pt-4 lg:flex-row lg:space-x-4 lg:space-y-0">
      <button
        type="button"
        className="button w-full lg:w-2/3"
        onClick={onShare}
      >
        Share
      </button>
      <button
        type="reset"
        className="w-full whitespace-nowrap rounded-sm bg-neutral-700 px-2 py-2 text-sm text-neutral-400 transition duration-150 ease-in-out hover:bg-neutral-600 hover:text-neutral-300 lg:w-1/3"
        onClick={onResetAll}
      >
        Reset All
      </button>
    </div>
  )
}

export default ShareActions
