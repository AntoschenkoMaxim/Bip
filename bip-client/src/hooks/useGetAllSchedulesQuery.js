import { useQuery } from 'react-query'
import { getAllSchedules } from '../api/getScheduleRequest'

export const useGetAllSchedulesQuery = () => {
  return useQuery({
    queryFn: () => getAllSchedules(),
    queryKey: ['schedules'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}
