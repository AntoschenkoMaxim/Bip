import { useQuery } from 'react-query'
import { getAllLessons } from '../api/getLessonsRequest'

export const useGetAllLessonsQuery = () => {
  return useQuery({
    queryFn: () => getAllLessons(),
    queryKey: ['lessons'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}
