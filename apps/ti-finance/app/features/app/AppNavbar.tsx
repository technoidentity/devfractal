/* eslint-disable jsx-a11y/anchor-has-content */
import { Box } from '@mantine/core'
import {
  IconActivity,
  IconBrandCashapp,
  IconBusinessplan,
  IconDiscount2,
  IconHomeDollar,
  IconUserCircle,
  IconMoneybag,
} from '@tabler/icons-react'
import { CustomLink } from '~/core'

export const AppNavbar = () => {
  return (
    <Box mt="xl">
      <CustomLink
        to="/ctc"
        uiProps={{ label: 'Person CTC', icon: <IconUserCircle /> }}
        style={{ textDecoration: 'none', fontWeight: 'bold' }}
      />

      <CustomLink
        to="/department"
        uiProps={{
          label: 'Department',
          icon: <IconActivity />,
          bg: '#f0f0f0',
          mt: 'sm',
        }}
        style={{
          textDecoration: 'none',
          fontWeight: 'bold',
          backgroundColor: 'lightgrey',
        }}
      />

      <CustomLink
        to="/spend"
        uiProps={{
          label: 'Spend',
          icon: <IconBrandCashapp />,
          bg: '#f0f0f0',
          mt: 'sm',
        }}
        style={{
          textDecoration: 'none',
          fontWeight: 'bold',
          backgroundColor: 'lightgrey',
        }}
      />
      <CustomLink
        to="/budget"
        uiProps={{
          label: 'Budget',
          icon: <IconBusinessplan />,
          bg: '#f0f0f0',
          mt: 'sm',
        }}
        style={{
          textDecoration: 'none',
          fontWeight: 'bold',
          backgroundColor: 'lightgrey',
        }}
      />
      <CustomLink
        to="/expenditure"
        uiProps={{
          label: 'Expenditure',
          icon: <IconDiscount2 />,
          bg: '#f0f0f0',
          mt: 'sm',
        }}
        style={{
          textDecoration: 'none',
          fontWeight: 'bold',
          backgroundColor: 'lightgrey',
        }}
      />
      <CustomLink
        to="/department/cost"
        uiProps={{
          label: 'Costing',
          icon: <IconHomeDollar />,
          bg: '#f0f0f0',
          mt: 'sm',
        }}
        style={{
          textDecoration: 'none',
          fontWeight: 'bold',
          backgroundColor: 'lightgrey',
        }}
      />
      <CustomLink
        to="/budget/utilize"
        uiProps={{
          label: 'Budget Utilize',
          icon: <IconMoneybag />,
          bg: '#f0f0f0',
          mt: 'sm',
        }}
        style={{
          textDecoration: 'none',
          fontWeight: 'bold',
          backgroundColor: 'lightgrey',
        }}
      />
    </Box>
  )
}
