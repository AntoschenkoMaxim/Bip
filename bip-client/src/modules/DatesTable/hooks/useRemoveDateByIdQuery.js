import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { removeDateById } from '../api/removeDateRequest'

export const useRemoveDateByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removeDateById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['dates'] })
      message.success('Срок вступления удален!')
    },
  })
}
