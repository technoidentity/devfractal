import {
  faBell,
  faBus,
  faCarBattery,
  faMapMarked,
  faPaperPlane,
  faUserFriends,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import 'bulma/css/bulma.css'
import React from 'react'
import { render } from 'react-dom'
import { SafeRoute, SafeRouter } from 'srtp-core'
import { Icon, Section } from './core'
import { Menu, MenuItem, MenuList } from './routed'

const MenuComponent: React.FC = () => (
  <Menu>
    <MenuList
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MenuItem href="/drivers">
        <Icon icon={faUsers} /> Drivers
      </MenuItem>
      <MenuItem href="/vehicles">
        <Icon icon={faBus} /> Vehicles
      </MenuItem>
      <MenuItem href="/batteries">
        <Icon icon={faCarBattery} /> Battery
      </MenuItem>
      <MenuItem href="/clients">
        <Icon icon={faUserFriends} /> Clients
      </MenuItem>
      <MenuItem href="#!">
        <Icon icon={faMapMarked} /> Geofences
      </MenuItem>
      <MenuItem href="/users">
        <Icon icon={faUsers} /> Users
      </MenuItem>
      <MenuItem href="#!">
        <Icon icon={faBell} /> Alerts
      </MenuItem>
      <MenuItem href="#!">
        <Icon icon={faPaperPlane} /> Reports
      </MenuItem>
    </MenuList>
  </Menu>
)

const ClientList: React.FC = () => <h1>clients</h1>
const VehicleList: React.FC = () => <h1>vehicles</h1>

export const App: React.FC = () => {
  return (
    <Section>
      <SafeRouter variant="hash">
        <SafeRoute exact path="/" component={MenuComponent} />
        <SafeRoute exact path="/clients" component={ClientList} />
        <SafeRoute exact path="/vehicles" component={VehicleList} />
      </SafeRouter>
    </Section>
  )
}

render(<App />, document.getElementById('root'))
