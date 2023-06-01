import { useQuery } from 'react-query'
import { getAllAchievements } from '../api/getAchievementsRequest'

export const useGetAllAchievementsQuery = () => {
  return useQuery({
    queryFn: () => getAllAchievements(),
    queryKey: ['achievements'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}
