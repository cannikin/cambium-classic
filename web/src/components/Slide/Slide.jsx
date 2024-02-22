/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

const Slide = ({ photo, onClick }) => {
  return (
    <li
      className="group flex w-1/2 cursor-pointer justify-center p-3 transition duration-150 ease-in-out hover:scale-110 md:w-1/3 lg:w-1/4 xl:w-1/5"
      onClick={() => onClick(photo)}
    >
      <div className="flex min-h-56 w-full items-center justify-center rounded-lg bg-white p-4 shadow shadow-inner group-hover:shadow-lg">
        <img
          src={`/photos/${photo.filename}`}
          alt={`id ${photo.id}`}
          className="rounded-sm border border-neutral-200 object-cover md:max-h-50"
        />
      </div>
    </li>
  )
}

export default Slide
