import { useQuery } from '@tanstack/react-query'
import axios from 'redaxios'
import { baseUrl } from './common'

const getProducts = async () => {
  return axios
    .get(`${baseUrl}?select=id,title,price,stock,brand`)
    .then(result => result.data.products)
}

export const useData = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })
