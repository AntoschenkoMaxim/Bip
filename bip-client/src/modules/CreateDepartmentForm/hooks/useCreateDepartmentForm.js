import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { createDepartment } from '../api/createDepartmentRequest'

export const useCreateDepartmentQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      client.invalidateQueries(['departments'])
      message.success('Кафедра добавлена!')
    },
  })
}
