import { Router, Route, Set } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/photos/{id:Int}" page={PhotoPage} name="photo" />

      <Set wrap={AppLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/photos/{id:Int}/edit" page={EditPhotoPage} name="edit" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
