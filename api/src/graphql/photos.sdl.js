export const schema = gql`
  type Photo {
    id: Int!
    filename: String!
    metadata: Metadata!
  }

  type Metadata {
    image: ImageMetadata!
    exif: ExifMetadata!
  }

  type ImageMetadata {
    Make: String!
    Model: String!
    XResolution: Int!
    YResolution: Int!
    Copyright: String!
    Author: String!
  }

  type ExifMetadata {
    ApertureValue: Float!
    DateTimeOriginal: String!
    ExifImageHeight: Int!
    ExifImageWidth: Int!
    ExposureTime: Float!
    FNumber: Float!
    FocalLength: Float!
    ISO: Int!
    ShutterSpeedNumber: String!
  }

  type Query {
    photos: [Photo!]! @skipAuth
    photo(id: Int): Photo @skipAuth
  }
`
