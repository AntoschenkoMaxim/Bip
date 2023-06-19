import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { updateDateById } from '../api/updateDateRequest'

export const useUpdateDateByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateDateById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['dates'] })
      message.success('Срок вступления обновлен!')
    },
  })
}
