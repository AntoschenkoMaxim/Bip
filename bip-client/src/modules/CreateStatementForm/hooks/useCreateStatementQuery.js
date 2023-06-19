import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { createStatement } from '../api/createStatementRequest'

export const useCreateStatementQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createStatement,
    onSuccess: () => {
      client.invalidateQueries(['statements'])
      message.success('Заявление добавлено!')
    },
  })
}
