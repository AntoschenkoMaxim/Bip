import { message } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import { removeLessonById } from '../api/removeLessonRequest'

export const useRemoveLessonByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removeLessonById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['lessons'] })
      message.success('Предмет удален!')
    },
  })
}
