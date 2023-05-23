import { useMutation, useQueryClient } from 'react-query'
import { createLesson } from '../api/createLessonRequest'
import { message } from 'antd'

export const useCreateLessonQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      client.invalidateQueries(['lessons'])
      message.success('Предмет добавлен!')
    },
  })
}
