import Blank from 'src/components/Blank'
import Slide from 'src/components/Slide'
import { usePhotosContext } from 'src/contexts/PhotosContext'

const HomePage = () => {
  const { photos, loading } = usePhotosContext()

  if (loading) {
    return (
      <Blank>
        <h2 className="mb-4 text-lg text-neutral-500">Loading photos...</h2>
      </Blank>
    )
  }

  // no photos in web/public/photos
  if (photos.length === 0 && !loading) {
    return (
      <Blank>
        <h2 className="mb-4 text-2xl font-semibold text-neutral-500">
          No photos found
        </h2>
        <p className="text-neutral-600">
          Add photos to <code>web/public/photos</code> to get started.
        </p>
      </Blank>
    )
  }

  return (
    <>
      <div className="">
        <ul className="flex flex-wrap justify-center">
          {photos.map((photo) => (
            <Slide photo={photo} key={photo.id} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default HomePage
