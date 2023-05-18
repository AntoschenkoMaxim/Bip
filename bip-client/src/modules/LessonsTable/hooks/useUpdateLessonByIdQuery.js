import { message } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import { updateLessonById } from '../api/updateLessonRequest'

export const useUpdateLessonByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateLessonById,
    onSuccess: () => {
      client.invalidateQueries(['lessons'])
      message.success('Предмет обновлен!')
    },
  })
}
