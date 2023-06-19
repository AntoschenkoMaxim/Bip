import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { createDate } from '../api/createDateRequest'

export const useCreateDateQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createDate,
    onSuccess: () => {
      client.invalidateQueries(['dates'])
      message.success('Срок вступления добавлен!')
    },
  })
}
