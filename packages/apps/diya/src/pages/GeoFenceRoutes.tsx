import React from 'react'
import { CrudRoutes } from 'srtp-crud'
import { geoFenceAPI } from '../common'
import { GeoFenceForm, GeoFenceList } from '../views'

export const GeoFenceRoutes = () => (
  <>
    <CrudRoutes api={geoFenceAPI} form={GeoFenceForm} list={GeoFenceList} />
  </>
)
