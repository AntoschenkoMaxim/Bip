import { useMutation, useQueryClient } from 'react-query'
import { removeTeacherById } from '../api/removeTeacherRequest'
import { message } from 'antd'

export const useRemoveTeacherByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removeTeacherById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['teachers'] })
      message.success('Преподаватель удален!')
    },
  })
}
