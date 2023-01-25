import { Product } from '../../utils/types'

interface ProductRowProps {
  product: Product
}

export const ProductRow = ({ product }: ProductRowProps) => {
  return (
    <tr>
      {!product.stocked ? (
        <td style={{ color: 'red' }}>{product.name}</td>
      ) : (
        <td>{product.name}</td>
      )}
      <td>{product.price}</td>
    </tr>
  )
}
