import { useQuery } from 'react-query'
import { getPostsByCategoryId } from '../api/getPostsByCategoryIdRequest'

export const useGetPostsByCategoryIdQuery = (id) => {
  return useQuery({
    queryFn: () => getPostsByCategoryId(id),
    queryKey: ['posts', id],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}
