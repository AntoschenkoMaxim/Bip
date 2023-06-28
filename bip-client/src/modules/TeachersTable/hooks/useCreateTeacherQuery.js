import { useMutation, useQueryClient } from 'react-query'
import { createTeacher } from '../api/createTeacherRequest'
import { message } from 'antd'

export const useCreateTeacherQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      client.invalidateQueries(['teachers'])
      message.success('Преподаватель добавлен!')
    },
  })
}
