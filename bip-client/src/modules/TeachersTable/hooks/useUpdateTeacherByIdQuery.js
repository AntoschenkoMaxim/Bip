import { useMutation, useQueryClient } from 'react-query'
import { updateTeacherById } from '../api/updateTeacherRequest'
import { message } from 'antd'

export const useUpdateTeacherByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateTeacherById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['teachers'] })
      message.success('Преподаватель обновлен!')
    },
  })
}
