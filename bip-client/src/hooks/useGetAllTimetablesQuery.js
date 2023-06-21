import { useQuery } from 'react-query'
import { getAllTimetables } from '../api/getTimetablesRequest'

export const useGetAllTimetablesQuery = () => {
  return useQuery({
    queryFn: () => getAllTimetables(),
    queryKey: ['timetables'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}
