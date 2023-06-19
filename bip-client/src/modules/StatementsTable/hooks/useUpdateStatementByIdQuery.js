import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { updateStatementById } from '../api/updateStatementRequest'

export const useUpdateStatementByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateStatementById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['statements'] })
      message.success('Заявление обновлено!')
    },
  })
}
