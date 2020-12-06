import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Cart, Main } from './pages'
import CreateOrEdit from './pages/CreateOrEdit'

import './styles/index.scss'

export default function App() {
  const routes = (
    <Switch>
      <Route exact path='/cart' component={Cart} />
      <Route exact path={['/create', '/edit/:id']} component={CreateOrEdit} />
      <Route exact path={['/', '/page=:pageNumber']} component={Main} />
      <Route>
        <h1>NOT FOUND 404</h1>
      </Route>
    </Switch>
  )

  return (
    <div className='page'>
      <div className='container'>{routes}</div>
    </div>
  )
}
