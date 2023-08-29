import { Select } from '@mantine/core'
import { useAction } from '@srtp/react'

import { selectCategory } from './state'

export const CategoryMenu = () => {
  const onCategorySelect = useAction(selectCategory)

  return (
    <Select
      maw="600px"
      m="xl"
      label="Find your favorite category!"
      placeholder="Pick one"
      onChange={onCategorySelect}
      data={[
        { value: 'all', label: 'All' },
        { value: 'fashion', label: 'Fashion' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'books', label: 'Books' },
        { value: 'beauty', label: 'Beauty' },
      ]}
    />
  )
}
