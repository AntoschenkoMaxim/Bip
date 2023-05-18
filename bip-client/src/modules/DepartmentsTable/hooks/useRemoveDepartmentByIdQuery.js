import { useMutation, useQueryClient } from 'react-query'
import { removeDepartmentById } from '../api/removeDepartmentRequest'
import { message } from 'antd'

export const useRemoveDepartmentByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removeDepartmentById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['departments'] })
      message.success('Кафедра удалена!')
    },
  })
}
