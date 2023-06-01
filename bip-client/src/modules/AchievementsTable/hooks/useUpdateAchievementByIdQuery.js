import { useMutation, useQueryClient } from 'react-query'
import { updateAchievementById } from '../api/updateAchievementRequest'
import { message } from 'antd'

export const useUpdateAchievementByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateAchievementById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['achievements'] })
      message.success('Достижение обновлено!')
    },
  })
}
