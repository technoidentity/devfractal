import 'bulma/css/bulma.css'
import React from 'react'
import { APIComponents, CrudComponents } from 'srtp-core'
import { UIComponents, UICrudComponents } from 'srtp-ui'
import { SuperAdmin } from './SuperAdmin'

export const App = () => (
  <APIComponents.Provider value={UIComponents}>
    <CrudComponents.Provider value={UICrudComponents}>
      <SuperAdmin />
    </CrudComponents.Provider>
  </APIComponents.Provider>
)
