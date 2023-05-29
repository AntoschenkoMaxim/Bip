import { useQuery } from 'react-query'
import { getPostsByCategoryId } from '../api/getPostsByCategoryIdRequest'

export const useGetTeacherByIdQuery = (id) => {
  return useQuery({
    queryFn: () => get(id),
    queryKey: ['posts', id],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}
