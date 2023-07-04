import { useQuery } from 'react-query'
import { getTeacherById } from '../api/getTeacherRequest'

export const useGetTeacherByIdQuery = (id, url, key) => {
  return useQuery({
    queryFn: () => getTeacherById(id, url),
    queryKey: [key, id],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}
