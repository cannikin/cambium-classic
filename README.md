# Cambium Classic

A sample app built with the latest version of Redwood using the GraphQL API. This was built as a comparison to building the same app featuring Redwood's experimental support for React Server Components. For that version of the app, see: <https://github.com/cannikin/cambium-rsc>

<img width="1279" alt="image" src="https://github.com/cannikin/cambium-rsc/assets/300/de9fce2e-43ee-4e27-9bc1-f642970eb7d7">

This is a simple photo editing app letting you tweak the look of your images with [CSS filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) and view [EXIF metdata](https://en.wikipedia.org/wiki/Exif):

<img width="1279" alt="image" src="https://github.com/cannikin/cambium-rsc/assets/300/7ad5bc95-439a-46e2-91bd-4822ac7e4655">

After tweaking your image you can then share it. Users will see a big screen version of your image with edits, along with a "Remix" button to then make their own edits based on yours:

<img width="1279" alt="image" src="https://github.com/cannikin/cambium-classic/assets/300/60e96a36-a8af-42b3-97c0-389d0ee9de39">

## Setup

Populate `web/public/photos` with the images of your choice, or use the ones included. Note these are &copy; Rob Cameron and are available under the [CC BY-ND 4.0 license](https://creativecommons.org/licenses/by-nc/4.0/).

## Development

Start the dev server:

```
yarn rw dev
```

Your site will be available at <http://localhost:8910>
