import 'bulma'
import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { render } from 'react-dom'
import { APIComponents, SafeRouter, SimpleRedirect } from 'srtp-core'
import { UIComponents } from 'srtp-ui'
import { FSTodoApp } from './v3'

const App: React.FC = () => (
  <SafeRouter>
    <APIComponents.Provider value={UIComponents}>
      <SimpleRedirect from="/" to="/todos" />
      <FSTodoApp />
    </APIComponents.Provider>
  </SafeRouter>
)

render(<App />, document.getElementById('root'))
