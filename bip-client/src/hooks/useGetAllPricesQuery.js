import { useQuery } from 'react-query'
import { getAllPrices } from '../api/getPricesRequest'

export const useGetAllPricesQuery = () => {
  return useQuery({
    queryFn: () => getAllPrices(),
    queryKey: ['prices'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}
