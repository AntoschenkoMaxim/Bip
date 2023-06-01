import { useMutation, useQueryClient } from 'react-query'
import { removeAchievementById } from '../api/removeAchievementRequest'
import { message } from 'antd'

export const useRemoveAchievementByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removeAchievementById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['achievements'] })
      message.success('Достижение удалено!')
    },
  })
}
