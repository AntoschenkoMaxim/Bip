import { useMutation, useQueryClient } from 'react-query'
import { createAchievement } from '../api/createAchievementRequest'
import { message } from 'antd'

export const useCreateAchievementQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createAchievement,
    onSuccess: () => {
      client.invalidateQueries(['achievements'])
      message.success('Достижение добавлено!')
    },
  })
}
