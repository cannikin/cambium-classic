import { Router, Route, Set } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={AppLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/photos/{id:Int}/edit" page={EditPage} name="edit" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
