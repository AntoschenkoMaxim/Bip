import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { createItem } from '../api/createItemRequest'

export const useCreateItemQuery = (url, key) => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (data) => createItem(data, url),
    onSuccess: () => {
      client.invalidateQueries([key])
      message.success('Успешно добавлено!')
    },
  })
}
