import { render } from '@redwoodjs/testing/web'

import EditPage from './EditPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditPage />)
    }).not.toThrow()
  })
})
