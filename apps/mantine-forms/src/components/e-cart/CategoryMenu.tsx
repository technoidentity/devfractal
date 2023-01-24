import { Select } from '@mantine/core'
import React from 'react'

interface CategoryMenuProps {
  onCategorySelect(category: string): void
}

export const CategoryMenu: React.FC<CategoryMenuProps> = ({
  onCategorySelect,
}) => {
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
