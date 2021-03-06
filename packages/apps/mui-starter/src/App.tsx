import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import React from 'react'
import { APIComponents, SafeRoute, SafeRouter } from 'srtp-core'
import { MuiAPIComponents } from 'srtp-mui'
import 'typeface-roboto'
import { TodoApp } from './TodoApp'

const Index = () => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <TodoApp />
  </MuiPickersUtilsProvider>
)
export const App = () => (
  <APIComponents.Provider value={MuiAPIComponents}>
    <SafeRouter variant="browser">
      <SafeRoute path="/" component={Index} />
    </SafeRouter>
  </APIComponents.Provider>
)
