import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { removeStatementById } from '../../StatementsTable/api/removeStatementRequest'

export const useRemoveStatementByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removeStatementById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['statements'] })
      message.success('Заявление удалено!')
    },
  })
}
