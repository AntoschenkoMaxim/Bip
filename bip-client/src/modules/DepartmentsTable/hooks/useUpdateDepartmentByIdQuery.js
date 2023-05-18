import { useMutation, useQueryClient } from 'react-query'
import { updateDepartmentById } from '../api/updateDepartmentRequest'
import { message } from 'antd'

export const useUpdateDepartmentByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateDepartmentById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['departments'] })
      message.success('Кафедра обновлена!')
    },
  })
}
