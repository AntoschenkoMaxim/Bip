import { useQuery } from 'react-query'
import { getAllItems } from '../api/getAllItemsRequest'

export const useGetAllItemsQuery = (url, key) => {
  return useQuery({
    queryFn: () => getAllItems(url),
    queryKey: [key],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}
