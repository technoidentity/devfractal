import React from 'react'
import { component } from 'srtp-core'
import { Create, formProps } from 'srtp-crud'
import { Section, Simple } from 'srtp-ui'
import { empty } from 'srtp-utils'
import { AssignBattery, assignBatteryAPI } from '../common'
import { HeadTitle } from '../components'

const AssignBatteryProps = formProps(AssignBattery)

export const AssignBatteryForm = component(
  AssignBatteryProps,
  ({ onSubmit, initial = empty(AssignBattery) }) => (
    <>
      <Section>
        <HeadTitle>Assign</HeadTitle>
        <Simple.Form initialValues={initial} onSubmit={onSubmit}>
          <Simple.Text name="client" />
          <Simple.Text name="vehicleID" label="Vehicle ID" />
          <Simple.Text name="driver" />
          <Simple.FormButtons />
        </Simple.Form>
      </Section>
    </>
  ),
)

export const AssignBatteryRoute = () => (
  <Create
    api={assignBatteryAPI}
    form={AssignBatteryForm}
    path="/assignBattery/:id"
    redirectTo="/batteries"
  />
)
