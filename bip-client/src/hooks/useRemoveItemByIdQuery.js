import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { removeItemById } from '../api/removeItemRequest'

export const useRemoveItemByIdQuery = (url, key) => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (id) => removeItemById(id, url),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [key] })
      message.success('Успешно удалено!')
    },
  })
}
