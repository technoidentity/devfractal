import React from 'react'
import { CrudRoutes } from 'srtp-crud'
import { batteryAPI } from '../common'
import { BatteryForm, BatteryList } from '../views'

export const BatteryRoutes = () => (
  <CrudRoutes api={batteryAPI} form={BatteryForm} list={BatteryList} />
)
