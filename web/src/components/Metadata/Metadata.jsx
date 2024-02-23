import { format } from 'date-fns'

const Metadata = ({ photo }) => {
  if (!photo?.metadata) {
    return null
  }

  return (
    <div className="mx-4 mt-8 items-start md:flex md:space-x-8">
      <table className="metadata w-full">
        <tbody>
          <tr>
            <td>Date</td>
            <td>
              {format(
                new Date(
                  photo.metadata.exif.DateTimeOriginal.replace(
                    /^(\d+):(\d+):(\d+) /,
                    '$1-$2-$3T'
                  )
                ),
                'PP pp'
              )}
            </td>
          </tr>
          <tr>
            <td>Size</td>
            <td>
              {photo.metadata.exif.ExifImageWidth} x{' '}
              {photo.metadata.exif.ExifImageHeight}
            </td>
          </tr>
          <tr>
            <td>Resolution</td>
            <td>{photo.metadata.image.XResolution} ppi</td>
          </tr>
        </tbody>
      </table>

      <table className="metadata w-full">
        <tbody>
          <tr>
            <td>Camera</td>
            <td>
              {photo.metadata.image.Make} {photo.metadata.image.Model}
            </td>
          </tr>
          <tr>
            <td>Focal Length</td>
            <td>{photo.metadata.exif.FocalLength}mm</td>
          </tr>
          <tr>
            <td>ISO</td>
            <td>{photo.metadata.exif.ISO}</td>
          </tr>
        </tbody>
      </table>

      <table className="metadata w-full">
        <tbody>
          <tr>
            <td>Shutter Speed</td>
            <td>{photo.metadata.exif.ShutterSpeedNumber}</td>
          </tr>
          <tr>
            <td>Aperture</td>
            <td>f/{photo.metadata.exif.FNumber}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Metadata
