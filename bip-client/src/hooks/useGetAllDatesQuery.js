import { useQuery } from 'react-query'
import { getAllDates } from '../api/getDatesRequest'

export const useGetAllDatesQuery = () => {
  return useQuery({
    queryFn: () => getAllDates(),
    queryKey: ['dates'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}
