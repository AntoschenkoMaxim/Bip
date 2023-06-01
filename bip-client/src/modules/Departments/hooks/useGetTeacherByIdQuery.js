import { useQuery } from 'react-query'
import { getTeacherById } from '../api/getTeacherRequest'

export const useGetTeacherByIdQuery = (id) => {
  return useQuery({
    queryFn: () => getTeacherById(id),
    queryKey: ['teachers', id],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}
