import type { Product } from '../../utils/types'

interface ProductCategoryRowProps {
  category: Product['category']
}

export const ProductCategoryRow = ({ category }: ProductCategoryRowProps) => {
  return (
    <tr>
      <th style={{ color: 'green', textAlign: 'center' }}>{category}</th>
    </tr>
  )
}
