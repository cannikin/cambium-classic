import Blank from 'src/components/Blank'

import Slide from './Slide'

export const QUERY = gql`
  query GetPhotos {
    photos {
      id
      filename
    }
  }
`

export const Loading = () => (
  <Blank>
    <h2 className="mb-4 text-lg text-neutral-500">Loading photos...</h2>
  </Blank>
)

export const Empty = () => (
  <Blank>
    <h2 className="mb-4 text-2xl font-semibold text-neutral-500">
      No photos found
    </h2>
    <p className="text-neutral-600">
      Add photos to <code>web/public/photos</code> to get started.
    </p>
  </Blank>
)

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ photos }) => {
  return (
    <div className="">
      <ul className="flex flex-wrap justify-center">
        {photos.map((photo) => (
          <Slide photo={photo} key={photo.id} />
        ))}
      </ul>
    </div>
  )
}
