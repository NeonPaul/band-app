import React from 'react'
import { render } from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import CreateBand from './containers/create-band'
import Band from './containers/band'
import { BrowserRouter, Route } from 'react-router-dom'
import { loadBand } from './store/actions/band'

class App extends React.Component {
  render () {
    return <div>
      <BrowserRouter>
        <div>
          <Route path="/" component={CreateBand} />
          <Route path="/:id" component={Band} onEnter={(a,b)=>console.log(a,b)} />
        </div>
      </BrowserRouter>
    </div>
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
)
